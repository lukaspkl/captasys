import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, cities, num, location } = await req.json();
    // Tenta extrair apenas a parte da chave hexadecimal (40 caracteres) caso o usuário tenha colado algo a mais por engano
    const rawKey = process.env.SERPER_API_KEY || "";
    const apiKey = rawKey.match(/[a-f0-9]{40}/i)?.[0];

    if (!apiKey || apiKey === "SUA_CHAVE_AQUI" || apiKey === "") {
      console.error("[SCANNER_API] Erro: SERPER_API_KEY não configurada ou vazia no ambiente.");
      return NextResponse.json({ error: "Chave do Serper não configurada no servidor (Production Check)." }, { status: 500 });
    }

    const searchCities = Array.isArray(cities) ? cities : [cities];
    let query = keyword;

    // LÓGICA DE RESOLUÇÃO DE LINK CURTO / URL
    let isDirectLink = false;
    if (keyword && (keyword.includes("maps.app.goo.gl") || keyword.includes("goo.gl/maps") || keyword.includes("google.com/maps"))) {
      isDirectLink = true;
      console.log(`[SCANNER_API] Processando link direto: ${keyword}`);
      
      try {
        // Tenta resolver redirecionamento via fetch
        const res = await fetch(keyword, { 
          method: 'GET', 
          redirect: 'manual', // Usar manual para pegar o location header se necessário
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        
        let targetUrl = res.url;
        const locationHeader = res.headers.get("location");
        if (locationHeader) targetUrl = locationHeader;

        if (targetUrl.includes('/place/')) {
          const namePart = targetUrl.split('/place/')[1].split('/')[0];
          query = decodeURIComponent(namePart.replace(/\+/g, ' '));
          console.log(`[SCANNER_API] Alvo extraído via URL: "${query}"`);
        } else {
          // Fallback: Usa Serper Search para descobrir o título do lugar
          const traceRes = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
            body: JSON.stringify({ q: keyword, gl: "br", hl: "pt-br" })
          });
          
          if (traceRes.ok) {
            const traceData = await traceRes.json();
            // Se tiver Knowledge Graph, é a forma mais precisa
            if (traceData.knowledgeGraph?.title) {
              query = traceData.knowledgeGraph.title;
              console.log(`[SCANNER_API] Alvo extraído via KG: "${query}"`);
            } else if (traceData.organic && traceData.organic.length > 0) {
              // Pega o título do primeiro resultado orgânico (limpando o sufixo do Google Maps)
              const rawTitle = traceData.organic[0].title || "";
              query = rawTitle.split(' - ')[0].split(' | ')[0].split(' – ')[0].trim();
              console.log(`[SCANNER_API] Alvo extraído via Organic: "${query}"`);
            }
          }
        }
      } catch (err) {
        console.error("[SCANNER_API] Falha crítica no resolutor:", err);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let allLeads: any[] = [];
    
    // Se for link direto, fazemos apenas UMA busca global (sem cidade fixa)
    const citiesToSearch = isDirectLink ? [""] : searchCities;

    for (const city of citiesToSearch) {
      const searchQuery = city ? `${query} em ${city}` : query;
      console.log(`[SCANNER_API] Executando varredura: "${searchQuery}"`);
      
      try {
        const serperBody: any = { q: searchQuery, gl: "br", hl: "pt-br", num: num || 20 };
        if (location) serperBody.location = location;

        const response = await fetch("https://google.serper.dev/maps", {
          method: "POST",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serperBody),
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.error(`[SCANNER_API] Fallback Serper Error Status ${response.status}:`, data);
          continue; 
        }

        const results = data.places || data.links || data.organic || [];

        if (results.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formatted = results.map((place: any) => {
            let score = 40; 
            const reasons: string[] = [];
            
            if (!place.website) {
              score += 45;
              reasons.push("SEM_WEBSITE_DETECTADO (OPORTUNIDADE_MÁXIMA)");
            } else {
              score -= 10;
              reasons.push("Já possui presença web básica");
            }

            if (place.rating && place.rating < 4.2) {
              score += 15;
              reasons.push(`REPUTAÇÃO_BAIXA (${place.rating}★)`);
            }
            
            const reviewCount = place.ratingCount || place.reviews || 0;
            if (reviewCount < 10) {
              score += 10;
              reasons.push("POUCAS_AVALIAÇÕES_FALTA_AUTORIDADE");
            }

            if (place.phoneNumber) {
              score += 10;
            } else {
              score -= 30;
              reasons.push("SEM_CONTATO_DIFICULDADE_DE_PITCH");
            }

            return {
              title: place.title,
              address: place.address,
              phone: place.phoneNumber,
              url: place.website || "",
              mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " " + (place.address || ""))}`,
              rating: place.rating,
              reviews: reviewCount,
              reviewCount: reviewCount, // Adicionado para compatibilidade com o dossiê tático
              category: place.category || place.type,
              latitude: place.latitude,
              longitude: place.longitude,
              snippet: `${place.category || place.type || keyword} em ${city}`,
              score: Math.min(Math.max(score, 1), 99),
              temperature: score > 75 ? "Quente" : (score > 45 ? "Morno" : "Frio"),
              classificationMotivity: reasons.join(" | "), 
              analysisStatus: "SISTEMA_API_OK",
              city: city
            };
          });
          allLeads = [...allLeads, ...formatted];
        }
      } catch (err) {
        console.error(`[SCANNER_ERR] Falha na cidade ${city}:`, err);
      }
    }

    console.log(`[SCANNER_API] Varredura completa. ${allLeads.length} leads encontrados.`);

    return NextResponse.json({ 
        leads: allLeads, 
        totalFound: allLeads.length,
        debugToken: `SAT_HACK_FIXED_${Date.now()}`
    });
  } catch (error: unknown) {
    console.error("[SCANNER_ERROR]", error);
    return NextResponse.json({ error: "Falha na operação técnica do scanner." }, { status: 500 });
  }
}

