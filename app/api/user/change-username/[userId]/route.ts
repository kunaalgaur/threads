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
        const { username, newUsername } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                {
                    status: 404,
                }
            );
        }

        await user.updateOne({
            username: username,
        });

        return NextResponse.json(
            {
                message: 'Username updated.',
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                name: error.name,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
};
