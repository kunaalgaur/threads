import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        // Create a connection with DB
        await connectDB();

        const { email, password } = await req.json();

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json(
                {
                    message: 'This email is not registered, try signing up.',
                },
                {
                    status: 401,
                }
            );
        }

        const validatePassword = await user.comparePassword(password);
        if (!validatePassword) {
            return NextResponse.json(
                {
                    message:
                        'Incorrect password, please enter correct password to continue.',
                },
                { status: 401 }
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

        return NextResponse.json({
            user: userImpData,
            token: token,
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
