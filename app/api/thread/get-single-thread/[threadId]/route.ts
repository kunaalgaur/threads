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

        const thread = await Thread.findById(threadId);

        if (!thread) {
            return NextResponse.json({
                status: 404,
                name: 'Custom Error',
                message: 'Thread not found.',
            });
        }

        return NextResponse.json({
            status: 200,
            data: thread,
            message: 'Thread found',
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            name: error.name,
            message: error.message,
        });
    }
};
