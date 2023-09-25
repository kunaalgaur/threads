import Thread from '@/lib/models/Threads.model';
import { NextResponse } from 'next/server';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';

export const DELETE = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    try {
        await connectDB();

        const userId = params.userId;

        await User.findByIdAndDelete(userId);
        await Thread.findByIdAndDelete({ userId: userId });

        return NextResponse.json(
            {
                message: 'Account deleted with all the data.',
            },
            {
                status: 200,
            }
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
