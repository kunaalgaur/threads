import User from '@/lib/models/User.model';
import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request) => {
    try {
        await connectDB();

        const { userId, friendId } = await req.json();

        // Validate userId and friendId here (e.g., check if they are valid ObjectId values)

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found.',
                },
                { status: 404 }
            );
        }

        if (!friend) {
            return NextResponse.json(
                {
                    message: 'Friend not found.',
                },
                { status: 404 }
            );
        }

        if (user.followers.includes(friendId)) {
            // Unfollow user
            await user.followers.pull(friendId);
            await friend.followings.pull(userId);

            return NextResponse.json(
                {
                    message: 'User unfollowed.',
                },
                { status: 200 }
            );
        } else {
            // Follow user
            await user.followers.push(friendId);
            await friend.followings.push(userId);

            return NextResponse.json(
                {
                    message: 'User followed.',
                },
                { status: 200 }
            );
        }
    } catch (error: any) {
        // Handle specific error types and provide appropriate responses
        return NextResponse.json({
            status: 500,
            name: error.name,
            message: error.message,
        });
    }
};
