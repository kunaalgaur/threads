import Reply from '@/lib/models/Reply.model';
import Thread from '@/lib/models/Threads.model';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        await connectDB();

        const { userId, threadId, body } = await req.json();
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

        const thread = await Thread.findById(threadId);
        if (!thread) {
            return NextResponse.json(
                {
                    message: 'Thread not found.',
                },
                {
                    status: 404,
                }
            );
        }

        await Reply.create({
            threadId: threadId,
            userId: userId,
            body: body,
        });

        return NextResponse.json(
            {
                message: `You replied on ${user.name}'s thread`,
            },
            { status: 200 }
        );
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
