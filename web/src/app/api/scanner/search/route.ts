import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, cities } = await req.json();
    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey || apiKey === "SUA_CHAVE_AQUI") {
      return NextResponse.json({ error: "Chave do Serper não configurada." }, { status: 500 });
    }

    const searchCities = Array.isArray(cities) ? cities : [cities];
    let allLeads: any[] = [];

    console.log(`[SCANNER_BULK] Iniciando varredura em ${searchCities.length} cidades para: ${keyword}`);

    for (const city of searchCities) {
      const searchQuery = `${keyword} em ${city}`;
      
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
        
        // CORREÇÃO TÁTICA: O campo correto é 'places' e não 'maps'
        const results = data.places || data.maps || [];

        if (results.length > 0) {
          const formatted = results.map((place: any) => {
            let score = 40; 
            const reasons: string[] = [];
            
            // 1. OPORTUNIDADE: SEM WEBSITE (O Alvo de Ouro)
            if (!place.website) {
              score += 45;
              reasons.push("SEM_WEBSITE_DETECTADO (OPORTUNIDADE_MÁXIMA)");
            } else {
              score -= 10;
              reasons.push("Já possui presença web básica");
            }

            // 2. REPUTAÇÃO: BAIXA AVALIAÇÃO OU POUCAS REVIEWS
            if (place.rating && place.rating < 4.2) {
              score += 15;
              reasons.push(`REPUTAÇÃO_BAIXA (${place.rating}★)`);
            }
            
            // CORREÇÃO TÁTICA: Serper usa 'ratingCount'
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
              mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " " + place.address)}`,
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

    return NextResponse.json({ 
        leads: allLeads, 
        totalFound: allLeads.length,
        debugToken: `SAT_HACK_FIXED_${Date.now()}`
    });
  } catch (error: any) {
    console.error("[SCANNER_ERROR]", error);
    return NextResponse.json({ error: "Falha na operação técnica do scanner." }, { status: 500 });
  }
}
