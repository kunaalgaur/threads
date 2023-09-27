import Reply from '@/lib/models/Reply.model';
import { NextResponse } from 'next/server';
import { threadId } from 'worker_threads';

export const GET = async (
    req: Request,
    { params }: { params: { threadId: string } }
) => {
    try {
        const threadId = params.threadId;
        const replies = await Reply.find({ threadId: threadId }).populate(
            'userId',
            'username image'
        );

        return NextResponse.json(replies, { status: 200 });
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
