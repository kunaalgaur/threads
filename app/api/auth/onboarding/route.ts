import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const { userId, image, username, bio } = await req.json();

    const user = await User.findOne({ username: username });
    if (user) {
      return NextResponse.json({
        status: 404,
        name: 'Custom Error',
        message:
          'This user name is already taken, please try another username.',
      });
    }

    const userLookUp = await User.findById(userId);

    await userLookUp.updateOne({
      image: image,
      username: username,
      bio: bio,
    });

    return NextResponse.json({
      status: 200,
      message: 'You are now onboarded.',
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
};
