/**
 *          TRANSMISSÃO_SITEPROX: Cyberpunk Email Protocol
 */

export const getProtocolUpdateHtml = (userName: string, newRole: string) => {
  const roleColor = newRole === 'ADMIN' ? '#ef4444' : (newRole === 'PARTNER' ? '#00f3ff' : '#ff00ff');
  
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        
        body {
          margin: 0; padding: 0; background-color: #050505; 
          font-family: 'JetBrains+Mono', monospace; color: #ffffff;
        }
        .container {
          max-width: 600px; margin: 40px auto; padding: 40px;
          border: 1px solid rgba(0, 243, 255, 0.2); background-color: #0a0a0a;
          position: relative; overflow: hidden;
        }
        .scanline {
          width: 100%; height: 1px; background: rgba(0, 243, 255, 0.05);
          position: absolute; top: 0; left: 0;
        }
        .header {
          border-bottom: 2px solid ${roleColor}; padding-bottom: 20px; margin-bottom: 30px;
        }
        .logo {
          font-weight: 900; font-size: 24px; color: ${roleColor}; letter-spacing: -1px; margin: 0;
        }
        .status-badge {
          display: inline-block; background: ${roleColor}22; border: 1px solid ${roleColor}55;
          color: ${roleColor}; font-size: 10px; font-weight: 900; padding: 4px 12px;
          letter-spacing: 2px; margin-bottom: 20px;
        }
        h1 { font-size: 32px; font-style: italic; font-weight: 900; margin: 0 0 10px 0; }
        p { line-height: 1.6; font-size: 14px; color: #94a3b8; }
        .quote {
          margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 11px; text-transform: uppercase; color: #475569; letter-spacing: 2px;
        }
        .footer-phrase {
          font-weight: 900; color: #64748b; font-size: 9px; margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="scanline"></div>
        <div class="header">
          <p class="status-badge">SECURE_TRANSMISSION::STATUS_UPDATE</p>
          <h2 class="logo">SITEPROX_CORE_V1.0</h2>
        </div>
        
        <h1>PROTOCOLO_ATUALIZADO</h1>
        <p>Saudações, <strong>${userName}</strong>.</p>
        <p>Seus privilégios de acesso no ecossistema SiteProx foram reconfigurados pelo Comando Central.</p>
        
        <div style="background: rgba(255,255,255,0.02); padding: 20px; border-left: 4px solid ${roleColor}; margin: 25px 0;">
          <p style="margin:0; font-size: 10px; color: #64748b;">NOVO_NÍVEL_DE_ACESSO:</p>
          <h2 style="margin:5px 0 0 0; color: ${roleColor}; font-size: 28px; font-weight: 900;">${newRole}</h2>
        </div>

        <p>Você agora possui permissões de execução compatíveis com o cargo de <strong>${newRole}</strong>. Suas interfaces de dashboard foram recalibradas para refletir suas novas capacidades.</p>
        
        <p>O futuro não espera. Continue operando.</p>

        <div class="quote">
          "No caos da web moderna, nós somos a ordem. Bem-vindo à nova era da presença digital."
        </div>
        
        <p class="footer-phrase">SITEPROX — PROTOCOLO DO FUTURO // 2026</p>
      </div>
    </body>
    </html>
  `;
};
