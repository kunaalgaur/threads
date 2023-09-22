import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { username: string } }) => {
  try {
    await connectDB();

    const username = params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return NextResponse.json({
        status: 403,
        name: 'Custom Error',
        message: 'Incorrect userId, please enter correct userId.',
      });
    }

    const userImpData = {
      ...user.toObject(),
      password: undefined,
      forgotPasswordToken: undefined,
      forgotPasswordTokenExpiry: undefined,
      verifyToken: undefined,
      verifyTokenExpiry: undefined,
    };

    return NextResponse.json({ user: userImpData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
