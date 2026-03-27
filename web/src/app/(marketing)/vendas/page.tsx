import { Metadata } from 'next';
import SiteProxPage from './VendasClient';

export const metadata: Metadata = {
  title: "Venda Mais no WhatsApp com um Site Profissional",
  description: "Transformamos seu negócio invisível em uma máquina de lucro digital. Sites de alta performance para mecânicas, pet shops e negócios locais.",
  openGraph: {
    title: "SiteProx | Transforme Leads em Lucro Digital",
    description: "Criamos sites profissionais para negócios locais que querem mais clientes pelo WhatsApp e Google.",
    images: ["/tactical_decision.png"],
  }
};

export default function Page() {
  return <SiteProxPage />;
}
