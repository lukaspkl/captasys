import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, cities } = await req.json();
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
      console.log(`[SCANNER_API] Detectado link direto/curto do Maps: ${keyword}`);
      try {
        const res = await fetch(keyword, { 
          method: 'GET', 
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        const finalUrl = res.url;
        
        if (finalUrl !== keyword && finalUrl.includes('/place/')) {
          const parts = finalUrl.split('/place/');
          query = decodeURIComponent(parts[1].split('/')[0].replace(/\+/g, ' '));
        } else {
          // FALLBACK TÁTICO: Se não resolveu, pergunta pro Google Search quem é esse link
          const traceRes = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
            body: JSON.stringify({ q: keyword })
          });
          if (traceRes.ok) {
            const traceData = await traceRes.json();
            if (traceData.organic && traceData.organic.length > 0) {
              const rawTitle = traceData.organic[0].title;
              query = rawTitle.split(' - ')[0].split(' | ')[0].trim();
            }
          }
        }
      } catch (err) {
        console.error("[SCANNER_API] Erro no resolutor:", err);
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
        const response = await fetch("https://google.serper.dev/maps", {
          method: "POST",
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ q: searchQuery, gl: "br", hl: "pt-br" }),
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
              category: place.category || place.type,
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

