import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const queryParam = new URL(req.url).searchParams.get('query');

    if (!queryParam) {
      return NextResponse.json({
        status: 400,
        message: 'Missing "query" parameter',
      });
    }

    const users = await User.find({
      $or: [
        { name: { $in: [queryParam] } },
        { username: { $in: [queryParam] } },
      ],
    });

    if (!users || users.length === 0) {
      return NextResponse.json({
        status: 404,
        name: 'Custom Error',
        message: 'No users found by the provided criteria',
      });
    }

    return NextResponse.json({
      status: 200,
      data: users,
      message: 'Users found.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
