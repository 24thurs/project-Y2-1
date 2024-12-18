import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkCookie } from './serveraction/serverActions';
// import HandleUser from './components/HandleUser';

export async function middleware(request: NextRequest) {
  const isCookie = await checkCookie();

  if (!isCookie && request.nextUrl.pathname.startsWith('/review')) {
    const response = NextResponse.json({ component: 'HandleUser' });
    response.headers.set('Content-Type', 'application/json');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/review',
};