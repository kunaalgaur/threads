import Thread from '@/lib/models/Threads.model';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (
    req: Request,
    { params }: { params: { threadId: string } }
) => {
    try {
        await connectDB();

        const threadId = params.threadId;
        const { userId } = await req.json();

        const thread = await Thread.findById(threadId);
        if (!thread) {
            return NextResponse.json(
                {
                    message: 'Thread not found.',
                },
                { status: 404 }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found.',
                },
                { status: 404 }
            );
        }

        const hasLiked = thread.likes.includes(userId);

        if (hasLiked) {
            await thread.likes.pull(userId);
        } else {
            await thread.likes.push(userId);
        }

        await thread.save();

        return NextResponse.json({
            message: hasLiked ? 'Thread disliked.' : 'Thread liked.',
        });
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
