import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, MonitorSmartphone, Bot, ShieldCheck, MessageSquare, Play } from "lucide-react";
import Image from "next/image";

export default async function PropostaPage({ params }: { params: Promise<{ slug: string }> }) {
  // Simulação de como o "Analista de Qualidade" vai processar a URL do slug
  // Ex: `/proposta/mazi-imobiliaria-curitiba`
  const { slug } = await params;
  const rawName = slug.split('-').slice(0, -1).join(' ');
  const companyName = rawName ? rawName.replace(/\b\w/g, l => l.toUpperCase()) : "Sua Empresa";
  const cityName = slug.split('-').pop()?.replace(/\b\w/g, l => l.toUpperCase()) || "sua região";

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans selection:bg-blue-600/30 pb-20">
      
      {/* HEADER ELEGANTE */}
      <header className="border-b border-slate-800/50 bg-[#0e1522]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              C
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
              Capta<span className="font-light">SaaS</span>
            </span>
          </div>
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 gap-1.5 py-1 px-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Auditoria Confidencial
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-16">
        
        {/* BOAS VINDAS & HOOK */}
        <section className="text-center space-y-4">
          <Badge className="bg-blue-600/20 text-blue-400 border-none mb-4 hover:bg-blue-600/30 transition-colors">
            Diagnóstico Digital Exclusivo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Nós analisamos a presença da <span className="text-blue-500">{companyName}</span> na internet.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Nossos robôs varreram os resultados de busca em {cityName} e identificamos lacunas críticas onde vocês estão deixando dinheiro na mesa para a concorrência.
          </p>
        </section>

        {/* O VÍDEO CONVERSÃO (O UAU) */}
        <section className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
          <div className="relative aspect-video bg-[#0a101a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer hover:border-slate-700 transition-colors">
            {/* Aqui entraria o iframe real do Loom ou YouTube */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
            
            <div className="z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-blue-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-2" />
              </div>
              <p className="text-white font-medium text-lg tracking-wide drop-shadow-md">Aperte o play (1 min)</p>
            </div>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-slate-300 border border-slate-700">
              🔴 Gravado exclusivamente para {companyName}
            </div>
          </div>
        </section>

        {/* DIAGNÓSTICO (OPÇÃO 1 DO NOSSO PLANO) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <MonitorSmartphone className="w-6 h-6 text-rose-500" />
            O que encontramos de errado
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            
            <Card className="bg-[#121826] border-rose-900/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-3xl"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-rose-400 flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5" /> Dependência de Redes Sociais
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm leading-relaxed">
                <p>Notamos que a estrutura da empresa se apoia quase totalmente apenas no Instagram/Facebook ou Linktree genérico.</p>
                <div className="mt-4 bg-rose-950/30 p-3 rounded-lg border border-rose-900/30">
                  <span className="text-rose-300 font-semibold block text-xs uppercase tracking-wider mb-1">Risco</span>
                  Quando clientes de {cityName} pesquisam no Google pelo seu serviço, o &quot;concorrente A&quot; aparece com um site profissional e fica com a venda quente. Algorítmo de rede social limita seu alcance diário.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121826] border-orange-900/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-orange-400 flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5" /> Fuga de Leads no Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm leading-relaxed">
                <p>O fluxo atual faz o cliente clicar no link da Bio e cair num WhatsApp cru, esperando alguém responder manualmente.</p>
                <div className="mt-4 bg-orange-950/30 p-3 rounded-lg border border-orange-900/30">
                   <span className="text-orange-300 font-semibold block text-xs uppercase tracking-wider mb-1">Impacto</span>
                  Mais de 60% das vendas locais são perdidas por demora de mais de 5 minutos na primeira resposta. A madrugada e finais de semana viram buracos negros de vendas paradas.
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* A SOLUÇÃO (NOSSA OFERTA) */}
        <section className="space-y-6 bg-linear-to-br from-[#121a2f] to-[#0a101a] p-8 md:p-10 rounded-3xl border border-blue-900/30 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-[#0a101a]/0 to-transparent pointer-events-none"></div>
           
           <h2 className="text-3xl font-semibold text-white relative z-10">O Plano de Aceleração</h2>
           <p className="text-slate-400 relative z-10 max-w-2xl">Não estou aqui para te vender um &quot;sitezinho&quot;. Isso os curiosos fazem. O plano abaixo blinda o seu processo comercial conectando Autoridade com Escala.</p>
           
           <div className="grid md:grid-cols-2 gap-6 mt-8 relative z-10">
              <div className="bg-[#0b101b] border border-slate-800 p-6 rounded-2xl flex gap-4 items-start hover:border-blue-500/50 transition-colors">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <MonitorSmartphone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Máquina de Vendas (Landing Page)</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Site focado em alta conversão (Cópia Matadora)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Nota 95+ no Google Pagespeed</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Identidade visual da {companyName}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#0b101b] border border-slate-800 p-6 rounded-2xl flex gap-4 items-start hover:border-emerald-500/50 transition-colors">
                <div className="bg-emerald-600/20 p-3 rounded-xl">
                  <Bot className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Atendente I.A 24 Horas</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Responde o WhatsApp em 3 segundos</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Qualifica o lead e agenda reunião</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Só te chama quando a venda tá quente</li>
                  </ul>
                </div>
              </div>
           </div>
        </section>

        {/* AUTORIDADE (O DEV) */}
        <section className="bg-[#0e1624] border border-slate-800/60 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
          <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-[#1e293b] relative">
             <Image src="https://ui-avatars.com/api/?name=Harlley+Bastos&background=1e40af&color=fff&size=200" alt="Sua Foto" width={128} height={128} className="object-cover" />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">Prazer, eu não sou um amador da internet.</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              Sou o Especialista Tecnológico que está por trás dessa pesquisa. Me recuso a fazer propostas genéricas por PDF, por isso montei essa apresentação real pra você. Meu foco não é te dar trabalho, é instalar uma estrutura tecnológica na sua empresa que funciona no piloto automático e domina o digital de {cityName}.
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="text-center pb-10 space-y-6">
           <h2 className="text-2xl font-semibold text-white">Faz sentido resolvermos isso nessa semana?</h2>
           <p className="text-slate-400">Vamos marcar um papo rápido de 15 min pelo WhatsApp. Sem pressão. Te mostro o rascunho funcionando.</p>
           
           <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white font-medium text-base h-14 px-8 shadow-[0_0_25px_rgba(22,163,74,0.4)] transition-all hover:scale-105 rounded-full">
             <MessageSquare className="w-5 h-5 mr-3" /> Falar com Especialista no WhatsApp
           </Button>
           
           <p className="text-xs text-slate-600 mt-6 flex items-center justify-center gap-2">
             <ShieldCheck className="w-4 h-4" /> Link seguro & exclusivo gerado para os gestores da {companyName}
           </p>
        </section>

      </main>

      {/* FLOAT CTA MOBLIE */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-linear-to-t from-[#070b14] via-[#070b14]/90 to-transparent md:hidden z-50">
        <Button className="w-full bg-green-600 hover:bg-green-500 text-white shadow-lg h-12" size="lg">
          <MessageSquare className="w-4 h-4 mr-2" /> Agendar Projeto
        </Button>
      </div>

    </div>
  );
}
