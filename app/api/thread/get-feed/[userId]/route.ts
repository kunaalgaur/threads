import Thread from '@/lib/models/Threads.model';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (
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
                    message: 'User not found.',
                },
                { status: 404 }
            );
        }

        const followingsList: string[] = user.followings;
        const threads = await Thread.find({ userId: { $in: followingsList } });

        return NextResponse.json(
            {
                threads,
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
