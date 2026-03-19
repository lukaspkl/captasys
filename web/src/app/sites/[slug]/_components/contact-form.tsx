"use client";

import { useState } from "react";
import { captureLead } from "@/app/actions/leads";
import { Loader2, CheckCircle, Send, Phone, User, Mail, MessageSquare } from "lucide-react";

export default function LeadContactForm({ siteId, themeColor }: { siteId: string, themeColor: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("siteId", siteId);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("message", message);

    const res = await captureLead(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-10 bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in zoom-in duration-500 rounded-3xl">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
        <h3 className="text-2xl font-black text-white uppercase italic">Mensagem Enviada!</h3>
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Entraremos em contato com você o mais breve possível.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-xs font-black text-emerald-500 underline uppercase mt-4"
        >
          Enviar Outra Mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="hud-panel p-8 bg-black/40 border border-white/5 space-y-6">
       <div className="space-y-1">
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">SOLICITAR_ORÇAMENTO</h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Preencha os campos abaixo e entraremos em contato.</p>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase">Seu Nome *</label>
                <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                   <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 h-12 pl-10 pr-4 text-sm text-white focus:border-red-500 transition-all outline-none" 
                    placeholder="João Silva"
                   />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase">Seu Telefone *</label>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                   <input 
                    type="text" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 h-12 pl-10 pr-4 text-sm text-white focus:border-red-500 transition-all outline-none" 
                    placeholder="(99) 99999-9999"
                   />
                </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-600 uppercase">Seu E-mail (Opcional)</label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 h-12 pl-10 pr-4 text-sm text-white focus:border-red-500 transition-all outline-none" 
                  placeholder="exemplo@email.com"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-600 uppercase">Mensagem/Dúvida</label>
            <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-slate-700" />
                <textarea 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-red-500 transition-all outline-none resize-none" 
                  placeholder="Como podemos te ajudar hoje?"
                ></textarea>
            </div>
          </div>

          {error && <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase text-center">{error}</div>}

          <button 
             type="submit" 
             disabled={loading}
             style={{ backgroundColor: themeColor }}
             className="w-full h-14 flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] disabled:opacity-30"
          >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> ENVIAR_PROTOCOLO_CANAL</>}
          </button>
       </form>
    </div>
  );
}
