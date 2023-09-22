import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    const user_id = params.userId;

    try {
        await connectDB();

        const user = await User.findById(user_id);
        if (!user) {
            return NextResponse.json({
                status: 403,
                name: 'Custom Error',
                message: 'Incorrect userId, please enter correct userId.',
            });
        }

        const userImpData = {
            ...user.toObject(),
            password: undefined,
            forgotPasswordToken: undefined,
            forgotPasswordTokenExpiry: undefined,
            verifyToken: undefined,
            verifyTokenExpiry: undefined,
        };

        return NextResponse.json({ user: userImpData }, { status: 200 });
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
