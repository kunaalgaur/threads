import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    try {
        await connectDB();

        const userId = params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        if (!user.isPrivate) {
            await user.updateOne({ isPrivate: true });
            return NextResponse.json(
                {
                    message: 'Your account is now private.',
                },
                { status: 200 }
            );
        } else {
            await user.updateOne({ isPrivate: false });
            return NextResponse.json(
                {
                    message: 'Your account is now public.',
                },
                { status: 200 }
            );
        }
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
