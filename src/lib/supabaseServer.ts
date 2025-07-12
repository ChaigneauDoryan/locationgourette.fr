import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // The `cookies().set()` method can throw an error when called from a Server Component
            // that is being rendered below a `Suspense` boundary. Unforunately, there's no way to
            // opt out of this behavior yet. This will be fixed in a future version of Next.js
            // by allowing you to pass a `throwOnWrite: false` option to `cookies().set()`.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // The `cookies().set()` method can throw an error when called from a Server Component
            // that is being rendered below a `Suspense` boundary. Unforunately, there's no way to
            // opt out of this behavior yet. This will be fixed in a future version of Next.js
            // by allowing you to pass a `throwOnWrite: false` option to `cookies().set()`.
          }
        },
      },
    }
  );
}
