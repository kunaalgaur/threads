import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const userId = params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 403,
        name: 'Custom Error',
        message: 'Incorrect userId, please enter correct userId.',
      });
    }

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    return NextResponse.json({
      status: 200,
      data: userWithoutPassword,
      message: 'User found successfully.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
