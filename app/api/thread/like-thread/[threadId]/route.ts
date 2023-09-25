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

        const { userId } = await req.json();
        const threadId = params.threadId;

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

        if (thread.likes.includes(userId)) {
            await thread.updateOne({
                $pull: { likes: userId },
            });

            return NextResponse.json({
                message: 'Thread disliked.',
            });
        } else {
            await thread.updateOne({
                $push: { likes: userId },
            });

            return NextResponse.json({
                message: 'Thread liked.',
            });
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
