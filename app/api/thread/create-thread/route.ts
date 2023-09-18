import Thread from '@/lib/models/Threads.model';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { userId, caption, image } = await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        name: 'Custom Error',
        message: 'Username',
      });
    }

    await Thread.create({
      userId,
      caption,
      image,
    });

    return NextResponse.json({
      status: 201,
      message: 'Thread created.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
