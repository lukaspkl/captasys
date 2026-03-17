import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (next.js internals)
     * 3. /_static (static files)
     * 4. /favicon.ico, /site.webmanifest, etc.
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Obter o hostname (ex: villa-bistro.localhost:3000 ou villa-bistro.captasites.com.br)
  const hostname = req.headers.get('host') || 'localhost:3000';

  // Definir os domínios base (root)
  const rootDomains = ['localhost:3000', 'captasites.com.br', 'capta-sites.vercel.app'];
  
  // Limpar o hostname para verificar se é um root domain
  const searchDomain = rootDomains.find(d => hostname.includes(d));
  
  // Se for um domínio raiz (sem subdomínio), deixa passar para a home/dashboard
  if (!searchDomain || rootDomains.includes(hostname)) {
    return NextResponse.next();
  }

  // Extrair o slug do subdomínio
  // Ex: villa-bistro.localhost:3000 -> villa-bistro
  const slug = hostname.replace(`.${searchDomain}`, '');

  // IMPORTANTE: Evitar re-escrita se já estivermos na rota de sites
  if (url.pathname.startsWith(`/sites/`)) {
    return NextResponse.next();
  }

  console.log(`[Middleware] Redirecionando Tenant: ${slug} -> /sites/${slug}${url.pathname}`);

  // Re-escrever a URL internamente para a pasta de sites
  // O usuário continua vendo villa-bistro.localhost:3000/contato
  // Mas o Next.js renderiza app/sites/[slug]/contato/page.tsx
  return NextResponse.rewrite(
    new URL(`/sites/${slug}${url.pathname === '/' ? '' : url.pathname}`, req.url)
  );
}
