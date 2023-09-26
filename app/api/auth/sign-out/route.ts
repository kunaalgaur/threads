import { NextResponse } from 'next/server';

export const POST = (req: Request) => {
    try {
        const response = NextResponse.json(
            {
                message: 'You have been logged out.',
            },
            { status: 200 }
        );

        response.cookies.delete('token');
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                name: error.name,
                message: error.message,
            },
            { status: 500 }
        );
    }
};
