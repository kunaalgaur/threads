import mongoose, { Document, Schema, Types } from 'mongoose';

interface IReply extends Document {
    threadId: Types.ObjectId;
    userId: Types.ObjectId;
    body: string;
    likes: Types.ObjectId[];
}

const replySchema = new mongoose.Schema(
    {
        threadId: {
            type: Schema.Types.ObjectId,
            ref: 'Thread',
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        body: {
            type: String,
            required: true,
        },

        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Reply =
    mongoose.models.Reply || mongoose.model<IReply>('Reply', replySchema);
export default Reply;
