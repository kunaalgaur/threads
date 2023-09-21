import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
  try {
    // Create a connection with DB
    connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        name: 'CustomE Error',
        message: 'This email is not registered, try signing up.',
      });
    }

    user.comparePassword();

    const token = jwt.sign(email, process.env.JWT_SECRET as string);
    if (!token) {
      return NextResponse.json({
        status: 503,
        name: 'Custom Error',
        message: 'There was an error in generating token, please try later.',
      });
    }

    return NextResponse.json({
      status: 200,
      data: { userId: user._id, username: user.username, token: token },
      message: 'You are successfully logged in.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
