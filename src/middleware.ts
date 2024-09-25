import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if(request.nextUrl.pathname.startsWith('/logged-in')){
    if(!request.cookies.get("user_loggedin")){
      const passCode = request.nextUrl.searchParams.get('userKey');
      passCode && response.cookies.set("user_loggedin", passCode);      
    }else {
      return NextResponse.redirect(new URL('/money', request.url));
    }
  }
  if(request.nextUrl.pathname.startsWith('/money')){
    if(!request.cookies.get("user_loggedin")){      
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: '/(.*)',
  }