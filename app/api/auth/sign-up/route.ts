import User from '@/lib/models/User.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/mongoose';

export const POST = async (req: Request) => {
  try {
    // Create a connection with DB
    connectDB();

    const { name, email, password } = await req.json();

    // Check if the given email is registered or not
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json({
        status: 401,
        name: 'Custom Error',
        message: 'This email is already registered.',
      });
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      status: 201,
      message: 'You have successfully signed up.',
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
