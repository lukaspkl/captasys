const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './web/.env.local' });

async function testKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Testando chave:", apiKey ? "Presente" : "Ausente");
  
  if (!apiKey) return;

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Tenta listar modelos (precisa de permissão ou chave válida)
    // Nota: O método listModels pode não estar disponível em todas as versões do SDK de forma simples
    // Vamos tentar uma geração simples com o modelo flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Oi");
    const response = await result.response;
    console.log("Resposta de teste:", response.text());
    console.log("MODELO 'gemini-1.5-flash' FUNCIONANDO!");
  } catch (error) {
    console.error("ERRO NO TESTE:", error.message);
    if (error.message.includes("404")) {
        console.log("Tentando modelo alternativo 'gemini-pro'...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Oi");
            const response = await result.response;
            console.log("Resposta de teste (pro):", response.text());
            console.log("MODELO 'gemini-pro' FUNCIONANDO!");
        } catch (e2) {
            console.error("ERRO NO SEGUNDO TESTE:", e2.message);
        }
    }
  }
}

testKey();
