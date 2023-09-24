import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const { userId, friendId } = await req.json();
    
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return NextResponse.json({
        status: 404,
        nema: 'Custom Error',
        message: 'User not found.',
      });
    }

    if (!friend) {
      return NextResponse.json({
        status: 404,
        nema: 'Custom Error',
        message: 'Friend not found.',
      });
    }

    if (user.followers.include === friendId) {
      return user.updateOne({});
    } else {
      return user;
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
