import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    try {
        await connectDB();

        const { token } = await req.json();

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!verifyToken) {
            return NextResponse.json({
                message: 'Your login session expired please login again.',
            });
        }

        return NextResponse.json(
            {
                message: 'Token verified',
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                name: error.name,
                messgae: error.message,
            },
            { status: 500 }
        );
    }
};
