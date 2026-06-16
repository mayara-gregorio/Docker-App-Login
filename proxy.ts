import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const isPublic = ['/login', '/register'].includes(pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublic) {

    const verifyToken = jwt.verify(token.value, process.env.JWT_SECRET_KEY as string);
    
    if (!verifyToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};