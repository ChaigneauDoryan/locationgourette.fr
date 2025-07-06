import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // If user is signed in and trying to access /admin/login, redirect to dashboard
  if (user && request.nextUrl.pathname === '/admin/login') {
    console.log('Middleware: User logged in, trying to access login page. Redirecting to dashboard.');
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If user is not signed in and trying to access /admin/* (but not /admin/login), redirect to login
  if (!user && request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin/login') {
    console.log('Middleware: User not logged in, trying to access admin page. Redirecting to login.');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Re-enable admin role check
  if (user && request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin/login') {
    console.log('Middleware: User logged in, checking admin role for admin page.');
    console.log('Middleware: User ID for profile check:', user.id);
    const { data: profile, error } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

    if (error) {
      console.log('Middleware: Error fetching profile:', error);
    }
    console.log('Middleware: Profile data:', profile);

    if (error || !profile || !profile.is_admin) {
      console.log('Middleware: Admin role check failed. Redirecting to home.');
      // If not admin, redirect to home or show an error
      return NextResponse.redirect(new URL('/', request.url));
    }
    console.log('Middleware: Admin role check passed.');
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/'],
};
