import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    try {
        await connectDB();

        const userId = params.userId;
        const { newEmail } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                {
                    status: 404,
                }
            );
        }

        if (newEmail === user.email) {
            return NextResponse.json(
                {
                    message:
                        'The email you are trying to put and your previous email is same.',
                },
                {
                    status: 401,
                }
            );
        }

        await user.updateOne({
            email: newEmail,
        });

        return NextResponse.json(
            {
                message: 'Your email has been updated.',
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                name: error.name,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
};
