import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Créer le middleware next-intl
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Exclure les routes d'API de Better Auth du middleware next-intl
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith('/api/stripe/webhook')) {
    return NextResponse.next();
  }

  // Get current locale from path (default to 'fr' if not found) as checking starts with /fr or /en
  const pathname = request.nextUrl.pathname;

  // Basic check for locale in path
  const localeMatch = pathname.match(/^\/(fr|en)/);
  const locale = localeMatch ? localeMatch[1] : 'fr'; // Fallback to Fr if no locale found (though middleware usually handles this)

  const isAuthRoute = pathname.includes('/login') || pathname.includes('/signup') || pathname.includes('/register') || pathname.includes('/forgot-password');
  const isProtectedRoute = pathname.includes('/dashboard');

  // Check for session token
  const sessionToken = request.cookies.get('better-auth.session_token');

  if (isAuthRoute && sessionToken) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
    if (callbackUrl) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Appliquer le middleware next-intl pour toutes les autres routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
