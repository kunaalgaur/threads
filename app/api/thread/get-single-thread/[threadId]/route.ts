import Thread from '@/lib/models/Threads.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (
    req: Request,
    { params }: { params: { threadId: string } }
) => {
    try {
        await connectDB();

        const threadId = params.threadId;

        const thread = await Thread.findById(threadId).populate(
            'userId',
            'username image'
        );

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

        return NextResponse.json(thread, { status: 200 });
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
