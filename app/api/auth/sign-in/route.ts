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

    const validatePassword = await user.comparePassword(password);
    if (!validatePassword) {
      return NextResponse.json(
        {
          message:
            'Incorrect password, please enter correct password to continue.',
        },
        { status: 403 }
      );
    }

    const token = await user.getJWTToken();

    const userImpData = {
      ...user.toObject(),
      password: undefined,
      followers: undefined,
      followings: undefined,
      isPrivate: undefined,
      forgotPasswordToken: undefined,
      forgotPasswordTokenExpiry: undefined,
      verifyToken: undefined,
      verifyTokenExpiry: undefined,
    };

    const response = NextResponse.json({
      user: userImpData,
      token: token,
      message: 'You are successfully logged in.',
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
