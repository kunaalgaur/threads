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
        const { password, newPassword, confirmNewPassword } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        const validatepassword = user.comparePassword(password);
        if (!validatepassword) {
            return NextResponse.json(
                {
                    message:
                        'Incorrect password, please enter correct password.',
                },
                {
                    status: 401,
                }
            );
        }

        if (newPassword === confirmNewPassword) {
            return NextResponse.json({
                message: 'Password do not match,',
            });
        }

        await user.updateOne({
            password: newPassword,
        });

        return NextResponse.json(
            {
                message: 'Password updated.',
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                name: error.name,
                mesasage: error.message,
            },
            {
                status: 500,
            }
        );
    }
};
