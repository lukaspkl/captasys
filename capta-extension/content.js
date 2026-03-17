console.log("CaptaSaaS: Injetado na Pagina de Pesquisa - Extraindo Dados...");

// 1. Simula que somos humanos lendo a pagina
const readDelay = Math.random() * 2000 + 1500;

setTimeout(() => {
  const pageMatches = location.search.match(/[?&]start=(\d+)/);
  const startParam = pageMatches ? parseInt(pageMatches[1]) : 0;
  const currentPage = (startParam / 10) + 1; 

  const leads = [];
  
  // Seletores atualizados para 2024/2025: 
  // div.MjjYud e div.g sao os principais resultados orgânicos
  // div.VkpGBb sao os blocos do Google Maps na busca comum
  // div.Nv2Ybe e [role="article"] sao do Google Maps (Site Oficial)
  const searchResults = document.querySelectorAll('div.MjjYud, div.g, div.VkpGBb, .Ww4FFb, div.Nv2Ybe, [role="article"]');
  
  searchResults.forEach((container) => {
    try {
      // 1. TÍTULO (Otimizado 2025)
      const titleEl = container.querySelector('h3, [role="heading"], .dbg0pd, .qBF1Pd, .fontHeadlineSmall, span.rllt__ro');
      if (!titleEl) return;
      const title = titleEl.innerText.trim();
      
      // 2. URL (Prioridade para Botão "Site" do Google)
      const websiteBtn = container.querySelector('a.yYyVec, a[aria-label*="Website"], a.ab_button, a[data-dtype="d_lg"], a.mY6v6d');
      let url = websiteBtn ? websiteBtn.href : null;
      
      if (!url) {
          const firstLink = container.querySelector('a[href^="http"]:not([href*="google.com"])');
          url = firstLink ? firstLink.href : window.location.href;
      }

      // 3. MAPS URL (Ultra-Agreste 2025)
      let mapsUrl = null;
      const mapsLinkEl = container.querySelector('a[href*="/maps/"], a[data-url*="/maps/"], a[href*="google.com/maps"], a[href*="ludocid="], a[href*="ftid:"]');
      if (mapsLinkEl) {
          mapsUrl = mapsLinkEl.href || mapsLinkEl.getAttribute('data-url');
          if (mapsUrl && mapsUrl.startsWith('/')) mapsUrl = 'https://www.google.com' + mapsUrl;
      }
      
      // Se não achar link explícito, tenta o título caso ele aponte para pesquisa local com ludocid
      if (!mapsUrl && titleEl.closest('a') && titleEl.closest('a').href.includes('ludocid')) {
          mapsUrl = titleEl.closest('a').href;
          if (mapsUrl.startsWith('/')) mapsUrl = 'https://www.google.com' + mapsUrl;
      }

      // Se a URL capturada for do próprio Google, tenta trocar pelo mapsUrl ou deixa vazia se for lixo
      if (url && (url.includes('google.com/search') || url.includes('google.com.br/search'))) {
          url = mapsUrl || url;
      }

      // 4. RATING & REVIEWS (Padrão Y0A0hc)
      let rating = null;
      let reviewCount = null;
      
      const ratingContainer = container.querySelector('.Y0A0hc, .URV6ze, .rllt__details');
      if (ratingContainer) {
          const rEl = ratingContainer.querySelector('span:first-child, span[aria-label*="estrelas"]');
          const revEl = ratingContainer.querySelector('span:last-child, .R6KEmf, .SJ77j');
          
          if (rEl) {
              const rText = rEl.innerText || rEl.getAttribute('aria-label') || "";
              rating = rText.replace(',', '.').match(/\d+(\.\d+)?/)?.[0] || null;
          }
          
          if (revEl) {
              const revText = revEl.innerText || "";
              let count = revText.match(/\d+([.,]\d+)?/)?.[0] || null;
              if (count) {
                  count = count.replace('.', '');
                  if (revText.toLowerCase().includes('mil')) {
                      count = parseFloat(count.replace(',', '.')) * 1000;
                  }
                  reviewCount = Math.floor(count).toString();
              }
          }
      } else {
          // Fallback legacy
          const legacyRating = container.querySelector('.MW4etd, .Y_u_b, span[aria-label*="estrelas"]');
          if (legacyRating) {
              const rMatch = (legacyRating.innerText || legacyRating.getAttribute('aria-label')).match(/\d[.,]\d/);
              if (rMatch) rating = rMatch[0].replace(',', '.');
          }
      }

      // 5. ENDEREÇO & TELEFONE (Bloco dbg0pd + div + div)
      let mapAddress = null;
      let phoneFound = null;

      const infoBlock = container.querySelector('.dbg0pd + div + div, .vY60be');
      if (infoBlock) {
          const text = infoBlock.innerText;
          if (text.includes('·')) {
              const parts = text.split('·');
              mapAddress = parts[0].trim();
              phoneFound = parts[1]?.trim() || null;
          } else {
              mapAddress = text.trim();
          }
      }

      // Fallbacks para Endereço
      if (!mapAddress || mapAddress.length < 5) {
          const addrEl = container.querySelector('.LrzP7c, button[data-item-id="address"] .Io6YTe, .dr60be');
          if (addrEl) mapAddress = addrEl.innerText.trim();
      }

      // Fallbacks para Telefone
      if (!phoneFound) {
          const phoneEl = container.querySelector('span.L_u_b, button[data-item-id^="phone"] .Io6YTe, .UsEnBe');
          if (phoneEl) {
              const cleaned = phoneEl.innerText.replace(/[^\d\s()-+]/g, '').trim();
              if (cleaned.length > 8) phoneFound = cleaned;
          }
      }

      // 6. REDES SOCIAIS
      let socials = { instagram: null, facebook: null };
      const socialLinks = container.querySelectorAll('a[href*="instagram.com"], a[href*="facebook.com"]');
      socialLinks.forEach(link => {
          if (link.href.includes('instagram.com')) socials.instagram = link.href;
          if (link.href.includes('facebook.com')) socials.facebook = link.href;
      });

      // 7. STATUS
      let businessStatus = null;
      const statusEl = container.querySelector('.tAd7ce, .ivYqU, .hS660, .HiaYvf');
      if (statusEl) businessStatus = statusEl.innerText.split('·')[0].trim();

      // --- TRATAMENTO MAPS OFICIAL ---
      if (location.href.includes('google.com/maps')) {
          const mapsAddressEl = container.querySelector('button[data-item-id="address"] .Io6YTe, [aria-label*="Endereço"]');
          if (mapsAddressEl) mapAddress = mapsAddressEl.innerText;

          const mapsPhoneEl = container.querySelector('button[data-item-id^="phone"] .Io6YTe');
          if (mapsPhoneEl) phoneFound = mapsPhoneEl.innerText;

          const mapsWebsiteEl = container.querySelector('a[aria-label*="Website"]');
          if (mapsWebsiteEl) url = mapsWebsiteEl.href;
          
          mapsUrl = window.location.href;
      }

      // Filtro de Qualidade
      const isExternal = url && !url.includes("google.com");
      
      if (phoneFound || isExternal || rating || mapAddress) {
        leads.push({
          title: title,
          url: url,
          mapsUrl: mapsUrl,
          snippet: container.innerText.substring(0, 150).replace(/[\n\r]+/g, ' '),
          phone: phoneFound,
          email: null, // Scraper de email geralmente requer entrar no site
          fromPage: currentPage,
          rating: rating,
          reviewCount: reviewCount,
          address: mapAddress,
          businessStatus: businessStatus,
          socials: socials
        });
      }
    } catch (e) {
      console.warn('Erro ao processar container:', e);
    }
  });

  // Paginação
  const nextBtn = document.querySelector('a#pnnext');
  let hasNextPage = !!nextBtn;
  let nextPageUrl = nextBtn ? nextBtn.href : null;

  // Debug Visual caso falhe
  if (leads.length === 0) {
    leads.push({
      title: "🔍 DEBUG - Robô no " + document.title,
      url: window.location.href,
      snippet: `Viu ${document.querySelectorAll('div.MjjYud').length} MjjYud, ${document.querySelectorAll('div.g').length} g, ${document.querySelectorAll('div.VkpGBb').length} mapas. Total Links: ${document.querySelectorAll('a').length}. (Se tudo zero, verifique se há Captcha ou aviso de Cookies)`,
      phone: "00000000",
      email: "debug@bot.com",
      fromPage: currentPage
    });
  }

  console.log(`CaptaSaaS Raspagem: ${leads.length} encontrados.`);

  chrome.runtime.sendMessage({
    action: "SCRAPED_RESULTS",
    leads: leads,
    currentPage: currentPage,
    hasNextPage: hasNextPage,
    nextPageUrl: nextPageUrl
  });

}, readDelay);
