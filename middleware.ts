import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublicPath = path === '/sign-up' || path === '/sign-in';

    const token = req.cookies.get('token')?.value || '';

    // Check if the user is trying to access a public path while authenticated
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Check if the user is trying to access a protected path while not authenticated
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }

    // // Check if the user is trying to access '/onboarding' while already onboarded
    // const isOnboardingPath = path === '/onboarding';
    // const isUserOnboarded = /* Add your logic to check if the user is onboarded */;

    // if (isOnboardingPath && isUserOnboarded) {
    //     return NextResponse.redirect(new URL('/', req.nextUrl));
    // }
}

export const config = {
    matcher: [
        '/',
        '/sign-up',
        '/sign-in',
        '/onboarding',
        '/profile/:userId*',
        '/search',
        '/activity/:userId*',
        '/edit-profile/:userId*',
        '/followers/:userId*',
        '/followings/:userId*',
        '/activity',
        '/likes',
        '/thread/:threadId*',
        '/thread/create',
        '/settings/:userId*',
    ],
};
