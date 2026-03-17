// CaptaSaaS - O Cerebro Invisivel
// Ele abre as abas, orquestra a paginacao e acumula os leads

let currentSearchTabId = null;
let currentDork = "";
let maxPages = 5;
let allLeads = [];

// 0. Fallback Manual: Se a pagina Localhost falhar em se comunicar (bloqueio do Chrome), 
// Clique no "Ícone de Quebra-Cabeca" > CaptaSaaS Motor Ativo.
chrome.action.onClicked.addListener((tab) => {
  // Procura a aba do Dashboard para puxar a pesquisa dinâmica que o usuário digitou
  chrome.tabs.query({ url: "*://localhost/*" }, (tabs) => {
    // Tenta localhost:* ou 127.0.0.1:*
    chrome.tabs.query({}, (allTabs) => {
      const dashboardTab = allTabs.find(t => t.url && (t.url.includes("localhost") || t.url.includes("127.0.0.1")));
      
      if (dashboardTab) {
        chrome.scripting.executeScript({
          target: { tabId: dashboardTab.id },
          func: () => localStorage.getItem("capta_dork")
        }).then(results => {
          const dynamicDork = results[0]?.result;
          const finalDork = dynamicDork || '+"Terapeuta" +"Curitiba" +"PR" (site:instagram.com)';
          
          const url = "https://www.google.com/search?q=" + encodeURIComponent(finalDork) + "&num=20";
          chrome.tabs.create({ url: url, active: true }, (newTab) => {
            currentSearchTabId = newTab.id;
            maxPages = 3;
            allLeads = [];
          });
        }).catch(err => console.log("Erro ao injetar", err));
      } else {
        // Fallback total se o localhost nao estiver aberto
        const url = "https://www.google.com/search?q=" + encodeURIComponent('+"Terapeuta" +"Curitiba" (site:instagram.com)') + "&num=20";
        chrome.tabs.create({ url: url, active: true }, (newTab) => {
          currentSearchTabId = newTab.id;
          maxPages = 3;
          allLeads = [];
        });
      }
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // START SEARCH ACIONADO PELO NOVO GATILHO DO CONTENT SCRIPT OU BRIDGE
  if (request.action === "START_SEARCH") {
    console.log("Comando de Varredura recebido:", request.payload);
    
    let { dork, nicho, cidade, pages } = request.payload;
    currentDork = dork || "";
    maxPages = pages || 5;
    allLeads = [];

    // Se tiver nicho e cidade, otimiza para pesquisa do maps
    if (nicho && cidade) {
      currentDork = `${nicho} near ${cidade}`;
    }
    
    // Abrir o google de forma ativa para teste
    const url = "https://www.google.com/search?q=" + encodeURIComponent(currentDork) + "&num=20";
    chrome.tabs.create({ url: url, active: true }, (tab) => {
      currentSearchTabId = tab.id;
    });
    
    notifyDashboard({ action: "SEARCH_PROGRESS", status: "Varrendo Google: Página 1", progress: 5 });
    sendResponse({ success: true });
  }
  
  if (request.action === "SCRAPED_RESULTS") {
    // Resultados vieram do script (content.js) rodando na aba do Google
    allLeads = allLeads.concat(request.leads);
    console.log(`Pagina ${request.currentPage} coletada. Total de leads arrastados:`, allLeads.length);
    
    notifyDashboard({ 
      action: "SEARCH_PROGRESS", 
      status: `Página ${request.currentPage} coletada (${allLeads.length} leads encontrados)...`, 
      progress: (request.currentPage / maxPages) * 100 
    });
    
    // Devo continuar para a proxima pagina ou parar?
    if (request.currentPage < maxPages && request.hasNextPage) {
      // Simula uma espera humana entre paginas (entre 3 e 6 segundos)
      const humanDelay = Math.random() * 3000 + 3000;
      
      setTimeout(() => {
        chrome.tabs.update(currentSearchTabId, { url: request.nextPageUrl });
      }, humanDelay);
      
    } else {
      // Fim da varredura
      console.log("Varredura concluida! Leads Encontrados:", allLeads.length);
      
      notifyDashboard({ action: "LEADS_FOUND", leads: allLeads, finished: true });
      
      // Fecha a aba oculta de varredura docemente após 2 segundos
      setTimeout(() => {
        if (currentSearchTabId) chrome.tabs.remove(currentSearchTabId);
        currentSearchTabId = null;
      }, 2000);
    }
  }

  if (request.action === "ANALYZE_LEAD") {
    // Permite Maps, mas bloqueia Redes Sociais genéricas que não dão pra analisar via DOM simples
    if ((request.url.includes("facebook.com") || request.url.includes("instagram.com")) && !request.url.includes("google.com/maps")) {
      notifyDashboard({
        action: "LEAD_ANALYSIS_RESULT",
        analysis: { platform: "Social Media Profile", pixels: [], responsive: true, score: 70, address: "Ver Perfil Social" }
      });
      return;
    }

    console.log("Analisando site do lead:", request.url);
    chrome.tabs.create({ url: request.url, active: false }, (tab) => {
      let analysisDone = false;

      const finishAnalysis = () => {
         if (!analysisDone) {
            analysisDone = true;
            chrome.tabs.remove(tab.id, () => { if (chrome.runtime.lastError) {} });
         }
      };

      // Timeout de seguranca: 10 segundos
      const timeout = setTimeout(finishAnalysis, 10000);

      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["analyzer.js"]
          }).catch(err => {
            console.error("Falha ao injetar analyzer:", err);
            finishAnalysis();
          });
        }
      });
    });
  }

  if (request.action === "ANALYSIS_COMPLETE") {
    console.log("Análise concluída via Injection:", request.analysis);
    notifyDashboard({
      action: "LEAD_ANALYSIS_RESULT",
      analysis: request.analysis
    });
    // Fecha a aba de análise imediatamente
    if (sender.tab) {
      chrome.tabs.remove(sender.tab.id, () => { if (chrome.runtime.lastError) {} });
    }
  }

  if (request.action === "MANUAL_LEAD_CAPTURE") {
    console.log("Recebido lead manual do Maps:", request.lead);
    notifyDashboard({
      action: "MANUAL_LEAD_ADDED",
      lead: request.lead
    });
    sendResponse({ success: true });
  }
});

function notifyDashboard(message) {
  // Pega todas as abas e procura o dashboard (funciona pra localhost com ou sem porta específica)
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.url && (tab.url.includes("localhost") || tab.url.includes("127.0.0."))) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (msg) => {
            // Injetamos o evento forçadamente!
            window.dispatchEvent(new CustomEvent("CAPTASAAS_UPDATE", { detail: msg }));
          },
          args: [message]
        }).catch(err => console.log("Erro ao injetar script (aba sem permissao ou carregando):", err));
      }
    });
  });
}
