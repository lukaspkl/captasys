import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "localhost:3000";

  const rootDomains = [
    "localhost:3000",
    "captasites.com.br",
    "siteprox.com.br",
    "www.siteprox.com.br",
    "capta-sites.vercel.app",
    "captasys.net",
    "captasys.vercel.app",
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || ""
  ].filter(Boolean);
  
  const isRootDomain = rootDomains.includes(hostname);

  // 1. SUBDOMAIN ROUTING (INSTANT)
  if (!isRootDomain) {
     const parts = hostname.split(".");
     if (parts.length > 1) {
        const slug = parts[0];
        if (!url.pathname.startsWith("/sites/")) {
           const tenantPath = `/sites/${slug}${url.pathname === "/" ? "" : url.pathname}`;
           console.log(`[MIDDLEWARE] Rewriting subdomain ${slug} to ${tenantPath}`);
           return NextResponse.rewrite(new URL(tenantPath, req.url));
        }
     }
  }

  // 2. SUPABASE AUTH GUARD (PROTECTED ROUTES)
  let supabaseResponse = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Se estiver tentando acessar /admin sem estar logado -> REDIRECIONAR PARA LOGIN
  if (url.pathname.startsWith("/admin") && !user) {
    console.warn(`[AUTH] Acesso negado a ${url.pathname}. Redirecionando para /login`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se já estiver logado e tentar acessar /login -> REDIRECIONAR PARA O PAINEL
  if (url.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin/leads", req.url));
  }

  return supabaseResponse;
}
