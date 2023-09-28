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
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found.',
                },
                { status: 404 }
            );
        }

        const { friendId } = await req.json();
        const friend = await User.findById(friendId);

        if (!friend) {
            return NextResponse.json(
                {
                    message: 'Friend not found.',
                },
                { status: 404 }
            );
        }

        if (userId === friendId) {
            return NextResponse.json(
                {
                    message: 'You cannot follow your self.',
                },
                { status: 403 }
            );
        }

        if (user.followers.includes(friendId)) {
            // Unfollow user
            await User.updateOne(
                { _id: userId },
                { $pull: { followers: friendId } }
            );

            await User.updateOne(
                { _id: friendId },
                { $pull: { followings: userId } }
            );

            return NextResponse.json(
                {
                    message: 'User unfollowed.',
                },
                { status: 200 }
            );
        } else {
            // Follow user
            await User.updateOne(
                { _id: userId },
                { $addToSet: { followers: friendId } } // Use $addToSet to ensure uniqueness
            );

            await User.updateOne(
                { _id: friendId },
                { $addToSet: { followings: userId } } // Use $addToSet to ensure uniqueness
            );

            return NextResponse.json(
                {
                    message: 'User followed.',
                },
                { status: 200 }
            );
        }
    } catch (error: any) {
        // Handle specific error types and provide appropriate responses
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
