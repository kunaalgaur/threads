import Thread from '@/lib/models/Threads.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const DELETE = async (
    req: Request,
    { params }: { params: { threadId: string } }
) => {
    try {
        await connectDB();

        const threadId = params.threadId;
        await Thread.findByIdAndDelete(threadId);

        
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
