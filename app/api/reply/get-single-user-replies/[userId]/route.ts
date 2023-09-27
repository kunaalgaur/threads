import Reply from '@/lib/models/Reply.model';
import { NextResponse } from 'next/server';

export const GET = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    try {
        const userId = params.userId;
        const replies = await Reply.find({ userId: userId }).populate(
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
