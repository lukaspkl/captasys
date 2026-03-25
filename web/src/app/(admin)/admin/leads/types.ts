// ─── LEAD ───────────────────────────────────────────────────────────────────
export interface Lead {
  title?: string;
  url?: string;
  mapsUrl?: string;
  phone?: string;
  address?: string;
  rating?: string | number;
  reviewCount?: string | number;
  status?: string;
  socials?: { instagram?: string; facebook?: string };
  techData?: {
    cms?: string;
    gtm?: boolean;
    pixel?: boolean;
    ads?: boolean;
    mobile?: boolean;
  };
  blockedReason?: string;
  classificationMotivity?: string;
  analysisStatus?: "PENDENTE" | "ANALISANDO" | "COMPLETO";
  savedAt?: string;
  swipedAt?: string;
  score?: number;
  temperature?: "Frio" | "Morno" | "Quente";
  snippet?: string;
  id?: string;
  reviews?: number | string;
  email?: string;
}

// ─── LEAD ANALYSIS ──────────────────────────────────────────────────────────
export interface LeadAnalysis {
  platform?: string;
  score?: number;
  perceptions?: string[];
}

// ─── LEAD SCORE ─────────────────────────────────────────────────────────────
export interface LeadScore {
  score: number;
  temperature: "Frio" | "Morno" | "Quente";
  reasons: string[];
}

// ─── STITCH CONFIG ──────────────────────────────────────────────────────────
export interface StitchConfig {
  name: string;
  themeId: string;
  segment: string;
  lead: Lead | null;
}

// ─── ACTIVE PROJECT ────────────────────────────────────────────────────────
export interface ActiveProject {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'suspended';
  renewal: string;
  monthlyFee: string;
  liveUrl: string;
  type: string;
  htmlContent: string;
  leadInfo?: Lead;
}


// ─── PROJECT SETTINGS ───────────────────────────────────────────────────────
export interface ProjectSettings {
  name: string;
  slug: string;
  whatsapp: string;
  monthlyFee: string;
  liveUrl: string;
}

// ─── TEMPLATE CONFIG ────────────────────────────────────────────────────────
export interface TemplateConfig {
  sellerName: string;
  basePrice: string;
  installments: string;
  installmentValue: string;
  demoBaseUrl: string;
}

// ─── MARKETING TEMPLATE ───────────────────────────────────────────────────
export interface MarketingTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

// ─── NICHE CONFIG ───────────────────────────────────────────────────────────
export interface NicheConfig {
  emoji: string;
  keywords: string[];
}

export const NICHE_CONFIG: Record<string, NicheConfig> = {
  "Energia Solar": { emoji: "☀️", keywords: ["Empresa de Energia Solar", "Energia Fotovoltaica", "Instalação Placas Solares", "Energia Solar Residencial"] },
  "Odontologia": { emoji: "🦷", keywords: ["Clínica Odontológica", "Dentista", "Ortodontia", "Implante Dentário", "Harmonização Facial"] },
  "Oficina Mecânica": { emoji: "🛠️", keywords: ["Oficina Mecânica", "Auto Elétrica", "Centro Automotivo", "Funilaria e Pintura", "Martelinho de Ouro"] },
  "Ar Condicionado": { emoji: "❄️", keywords: ["Ar Condicionado", "Refrigeração", "Manutenção de Ar Condicionado", "Instalação de Ar Condicionado"] },
  "Clínica de Estética": { emoji: "✨", keywords: ["Clínica de Estética", "Estética Avançada", "Biomedicina Estética", "Harmonização Facial"] },
  "Salão de Beleza": { emoji: "💇‍♀️", keywords: ["Salão de Beleza", "Barbearia", "Cabelereiro", "Esmalteria"] },
  "Clínica Veterinária": { emoji: "🐶", keywords: ["Clínica Veterinária", "Pet Shop", "Banho e Tosa", "Hospital Veterinário"] },
  "Advocacia": { emoji: "⚖️", keywords: ["Escritório de Advocacia", "Advogado Civil", "Advogado Trabalhista", "Direito de Família"] },
  "Segurança": { emoji: "🔐", keywords: ["Segurança Eletrônica", "Monitoramento 24h", "Instalação de Câmeras", "Alarme Residencial"] },
  "Mudanças": { emoji: "🚚", keywords: ["Empresa de Mudanças", "Frete e Carreto", "Transporte Residencial", "Mudança Interestadual"] },
  "Limpeza": { emoji: "🧼", keywords: ["Limpeza Pós-Obra", "Higienização de Sofá", "Limpeza de Fachada", "Terceirização de Limpeza"] },
  "Chaveiro": { emoji: "🔑", keywords: ["Chaveiro 24h", "Abertura de Veículos", "Chave Codificada", "Fechadura Eletrônica"] },
  "Vidraçaria": { emoji: "🚿", keywords: ["Vidraçaria", "Box de Vidro", "Espelho sob Medida", "Vidro Temperado"] },
  "Hamburgueria": { emoji: "🍔", keywords: ["Hamburgueria Artesanal", "Delivery de Lanche", "Fast Food", "X-Burger"] },
  "Pizzaria": { emoji: "🍕", keywords: ["Pizzaria Delivery", "Pizza Forno a Lenha", "Rodízio de Pizza"] },
  "Academia": { emoji: "🏋️‍♀️", keywords: ["Academia de Musculação", "Crossfit", "Personal Trainer", "Natação"] },
  "Construção": { emoji: "🧱", keywords: ["Material de Construção", "Reforma Residencial", "Pintura Comercial", "Engenharia Civil"] },
  "Geral": { emoji: "💼", keywords: ["Prestação de Serviços", "Consultoria de Negócios", "Marketing Digital"] }
};
export type View = "dashboard" | "active-sites" | "crm" | "templates" | "swipe" | "vault" | "settings" | "campaigns";
