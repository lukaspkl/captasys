// CaptaSaaS - Ponte entre a página Next.js (Localhost) e o Background Service Worker

// 1. Escuta comandos do Dashboard (Localhost:3000)
window.addEventListener("CAPTASAAS_START_SEARCH", (event) => {
  try {
    const payload = event.detail; // { dork: '...', pages: 5 }
    console.log("Bridge: Recebeu ordem de busca do Painel", payload);
    
    // Repassa para o cérebro da extensão (Background)
    chrome.runtime.sendMessage({ action: "START_SEARCH", payload });
  } catch (e) {
    if (e.message.includes("context invalidated")) {
      console.warn("CaptaSaaS: A extensão foi atualizada. Por favor, dê F5 na página (Dashboard) para restabelecer a conexão.");
      alert("Conexão reiniciada! Por favor, dê F5 (recarregar) na página do Painel para continuar.");
    } else {
      console.error("Bridge Error:", e);
    }
  }
});

window.addEventListener("CAPTASAAS_START_ANALYSIS", (event) => {
  try {
    const payload = event.detail; // { url: '...' }
    console.log("Bridge: Iniciando análise do site:", payload.url);
    chrome.runtime.sendMessage({ action: "ANALYZE_LEAD", url: payload.url });
  } catch (e) {
    console.error("Bridge Analysis Error:", e);
  }
});

// 2. Escuta retornos do background.js e repassa para o Dashboard
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Bridge: Mensagem recebida do Background:", message.action, message);
    if (
      message.action === "SEARCH_PROGRESS" || 
      message.action === "LEADS_FOUND" || 
      message.action === "LEAD_ANALYSIS_RESULT" ||
      message.action === "MANUAL_LEAD_ADDED"
    ) {
      // Dispara evento global que o React/Next.js estará escutando
      console.log("Bridge: Despachando evento CAPTASAAS_UPDATE para o Painel", message.action);
      window.dispatchEvent(new CustomEvent("CAPTASAAS_UPDATE", { detail: message }));
    }
  });
  console.log("CaptaSaaS: Ponte de comunicação conectada ao Localhost!");
}
// 3. RECUPERAÇÃO MANUAL NO GOOGLE MAPS (Opcional)
if (window.location.href.includes('google.com/maps') || window.location.href.includes('google.com.br/maps')) {
  console.log("CaptaSaaS: Bridge ativa no Google Maps!");
  const injectFloatingButton = () => {
    if (document.getElementById('captasaas-quick-send')) return;
    
    // Só injeta se houver um painel de detalhes aberto (geralmente tem h1 ou nome da empresa)
    if (!document.querySelector('h1.DUXo9b, .fontHeadlineLarge, .fontHeadlineSmall')) return;

    console.log("CaptaSaaS: Injetando botão de captura manual...");
    btn.id = 'captasaas-quick-send';
    btn.innerHTML = '⚡ ENVIAR AO CAPTASAAS';
    btn.style.cssText = `
      position: fixed; bottom: 80px; right: 20px; z-index: 999999;
      background: #06b6d4; color: white; border: none; padding: 12px 20px;
      font-weight: 900; font-family: 'Outfit', sans-serif; cursor: pointer;
      box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4); border-radius: 4px;
      letter-spacing: 1px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-left: 4px solid #fff; font-size: 12px;
    `;
    
    btn.onmouseover = () => btn.style.transform = 'scale(1.05) translateY(-5px)';
    btn.onmouseout = () => btn.style.transform = 'scale(1) translateY(0)';

    btn.onclick = () => {
      btn.innerHTML = '🚀 ENVIANDO...';
      btn.style.background = '#10b981';
      
      const title = document.querySelector('h1.DUXo9b, .fontHeadlineLarge')?.innerText || document.title.split(' - ')[0];
      const address = document.querySelector('button[data-item-id="address"] .Io6YTe')?.innerText;
      const phone = document.querySelector('button[data-item-id^="phone"] .Io6YTe')?.innerText;
      const website = document.querySelector('a[data-item-id="authority"]')?.href;
      
      const lead = {
        title: title,
        url: website || window.location.href,
        address: address,
        phone: phone,
        manual: true
      };

      chrome.runtime.sendMessage({ 
        action: "MANUAL_LEAD_CAPTURE", 
        lead: lead 
      });

      setTimeout(() => {
        btn.innerHTML = '✅ ENVIADO!';
        setTimeout(() => {
          btn.innerHTML = '⚡ ENVIAR AO CAPTASAAS';
          btn.style.background = '#06b6d4';
        }, 2000);
      }, 800);
    };

    document.body.appendChild(btn);
  };

  // Tenta injetar e se mantém atento a mudanças de página (SPA)
  setTimeout(injectFloatingButton, 2000);
  setInterval(injectFloatingButton, 5000);
}
