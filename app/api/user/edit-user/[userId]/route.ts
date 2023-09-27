import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    try {
        connectDB();

        const { currentUserId, name, image, bio } = await req.json();
        const userId = params.userId;

        console.log('currentUserId:' + currentUserId);
        console.log('userId:' + userId);

        if (userId !== currentUserId) {
            return NextResponse.json(
                {
                    message: 'You cannot access this resource.',
                },
                {
                    status: 403,
                }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                {
                    status: 403,
                }
            );
        }

        await user.updateOne({
            name: name,
            image: image,
            bio: bio,
        });

        return NextResponse.json({
            messgage: 'User updated successfully.',
        });
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
