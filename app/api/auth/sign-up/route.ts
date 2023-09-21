import User from '@/lib/models/User.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/mongoose';

export const POST = async (req: Request) => {
  try {
    // Creating connection with mongoDB
    await connectDB();

    const { name, email, password } = await req.json();

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return NextResponse.json(
      { message: 'User created successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { name: error.name, message: error.message },
      { status: 500 }
    );
  }
};
