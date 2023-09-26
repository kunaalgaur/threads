import Thread from '@/lib/models/Threads.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1', 10);

        const resultsPerPage = 15;

        const skip = (page - 1) * resultsPerPage;

        const threads = await Thread.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(resultsPerPage)
            .populate('userId', 'username image');

        return NextResponse.json(threads);
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
