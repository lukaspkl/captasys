import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
  let supabaseResponse = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Refresh session
  const { data: { user } } = await supabase.auth.getUser()

  const url = req.nextUrl;
  const hostname = req.headers.get('host') || 'localhost:3000';
  const rootDomains = ['localhost:3000', 'captasites.com.br', 'capta-sites.vercel.app'];
  const searchDomain = rootDomains.find(d => hostname.includes(d));
  const isRootDomain = !searchDomain || rootDomains.includes(hostname);

  // 2. Auth & RBAC Protection
  if (isRootDomain) {
    const isLoginPage = url.pathname.startsWith('/login');
    const isRegisterPage = url.pathname.startsWith('/register');
    const isAuthRoute = url.pathname.startsWith('/auth');

    if (!user && !isLoginPage && !isRegisterPage && !isAuthRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (user) {
      // Get role from public.profiles with metadata fallback
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      // Fallback hierarchy: Database Profile -> Auth User Metadata -> Default 'CLIENT'
      const role = profile?.role || (user.app_metadata?.role as string) || (user.user_metadata?.role as string) || 'CLIENT';

      console.log(`[Middleware] User: ${user.email} | Detected Role: ${role}`);

      // Redirect if logged in and trying to access /login OR the root path /
      const isRootPath = url.pathname === '/';
      if (isLoginPage || isRootPath) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin/core', req.url));
        if (role === 'PARTNER') return NextResponse.redirect(new URL('/partner/hub', req.url));
        return NextResponse.redirect(new URL('/dashboard/my-site', req.url));
      }

      // Route Protection
      // Allow ADMIN to see everything. If they are ADMIN, bypass the CLIENT/PARTNER blocks.
      if (url.pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/my-site', req.url));
      }
      if (url.pathname.startsWith('/partner') && role !== 'PARTNER' && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/my-site', req.url));
      }
    }
  }

  // 3. Subdomain Logic (Multi-tenant)
  if (!isRootDomain) {
    const slug = hostname.replace(`.${searchDomain}`, '');
    if (!url.pathname.startsWith(`/sites/`)) {
      return NextResponse.rewrite(
        new URL(`/sites/${slug}${url.pathname === '/' ? '' : url.pathname}`, req.url)
      );
    }
  }

  return supabaseResponse
}
