// CaptaSaaS - Analisador de Elite v2.1
// Detecta Plataforma, Pixels, SEO e extrai contatos/endereços reais
// Suporte aprimorado para Google Maps Direct

(function() {
    console.log("CaptaSaaS: Analisador de Elite Iniciado...");
    
    const isMaps = window.location.href.includes('google.com/maps');

    const extractData = () => {
        const analysis = {
            platform: isMaps ? "Google Maps Profile" : "Desconhecida",
            pixels: [],
            responsive: false,
            score: 0,
            address: null,
            extraEmails: [],
            extraPhones: [],
            socials: { instagram: null, facebook: null }
        };

        if (isMaps) {
            // --- EXTRAÇÃO DIRETA NO GOOGLE MAPS ---
            const nameEl = document.querySelector('h1.DUwDfb, div.fontHeadlineLarge');
            if (nameEl) analysis.businessName = nameEl.innerText;

            const addrBtn = document.querySelector('button[data-item-id="address"], button[aria-label*="Endereço"]');
            if (addrBtn) analysis.address = addrBtn.innerText.trim();

            const phoneBtn = document.querySelector('button[data-item-id^="phone:tel:"], button[aria-label*="Telefone"]');
            if (phoneBtn) analysis.extraPhones.push(phoneBtn.innerText.trim());

            const websiteBtn = document.querySelector('a[data-item-id="authority"], a[aria-label*="Website"]');
            if (websiteBtn) analysis.website = websiteBtn.href;

            // Redes Sociais no Maps
            const socialLinks = document.querySelectorAll('a[aria-label*="Instagram"], a[aria-label*="Facebook"], div.Us7fWe a');
            socialLinks.forEach(link => {
                if (link.href.includes('instagram.com')) analysis.socials.instagram = link.href;
                if (link.href.includes('facebook.com')) analysis.socials.facebook = link.href;
            });

            analysis.responsive = true;
            analysis.score = 100; // Perfil Maps Completo é gold standard
        } else {
            // --- EXTRAÇÃO EM WEBSITES ---
            const html = document.documentElement.innerHTML;
            const htmlLower = html.toLowerCase();
            
            if (htmlLower.includes('wp-content')) analysis.platform = "WordPress";
            if (htmlLower.includes('elementor')) analysis.platform = "WordPress + Elementor";
            if (htmlLower.includes('wix.com')) analysis.platform = "Wix";
            if (htmlLower.includes('shopify')) analysis.platform = "Shopify";
            if (htmlLower.includes('vtex')) analysis.platform = "VTEX";
            if (htmlLower.includes('rdstation') && htmlLower.includes('pages')) analysis.platform = "RD Station Pages";

            if (htmlLower.includes('fbq(') || htmlLower.includes('facebook.net')) analysis.pixels.push("Facebook Pixel");
            if (htmlLower.includes('gtag(') || htmlLower.includes('google-analytics')) analysis.pixels.push("Google Analytics");
            if (htmlLower.includes('googletagmanager.com/gtm.js')) analysis.pixels.push("GTM");

            analysis.responsive = !!document.querySelector('meta[name="viewport"]');

            const footer = document.querySelector('footer') || document.body;
            const addressRegex = /(?:rua|av|avenida|praça|alameda|estrada)\s+[^,]+,\s*\d+[^0-9]*[0-9]{5}-?[0-9]{3}/gi;
            const footerText = footer.innerText;
            const addressMatch = footerText.match(addressRegex);
            if (addressMatch) analysis.address = addressMatch[0].replace(/\n/g, ' ').trim();

            let points = 10;
            if (analysis.responsive) points += 30;
            if (analysis.pixels.length > 0) points += 20;
            if (document.querySelector('h1')) points += 20;
            if (htmlLower.includes('alt=')) points += 20;
            analysis.score = points;

            // Busca Socials no site
            const links = document.querySelectorAll('a[href*="instagram.com"], a[href*="facebook.com"]');
            links.forEach(l => {
                if (l.href.includes('instagram.com')) analysis.socials.instagram = l.href;
                if (l.href.includes('facebook.com')) analysis.socials.facebook = l.href;
            });
        }

        // 6. Percepções de Melhoria (Qualitativo para o SaaS)
        const perceptions = [];
        if (!analysis.responsive) perceptions.push("URGENTE: Site não é amigável para celular.");
        if (analysis.pixels.length === 0) perceptions.push("PERDA_DE_VENDAS: Sem pixels de rastreamento (Facebook/Google).");
        if (analysis.score < 60) perceptions.push("VISUAL: Layout parece datado e com pouca conversão.");
        if (analysis.platform.includes("WordPress") && !analysis.platform.includes("Elementor")) perceptions.push("TÉCNICO: Site em tecnologia antiga, lento de atualizar.");
        if (!document.querySelector('meta[name="description"]')) perceptions.push("SEO: Sem descrição no Google, perde visibilidade.");
        
        analysis.perceptions = perceptions.length > 0 ? perceptions : ["Operação digital básica detectada. Pode escalar."];

        return analysis;
    };

    const result = extractData();
    chrome.runtime.sendMessage({
        action: "ANALYSIS_COMPLETE",
        analysis: result
    });
})();
