import mongoose, { Document, Schema, Types } from 'mongoose';

interface IThreads extends Document {
    userId: Types.ObjectId;
    caption: string | null;
    image: string | null;
    likes: Types.ObjectId[];
    children: Types.ObjectId[];
}

const threadsSchema: Schema<IThreads> = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        caption: { type: String, default: null },
        image: { type: String, default: null },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        children: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comments',
            },
        ],
    },
    {
        timestamps: true,
    }
);

threadsSchema.pre('validate', function (next) {
    if (!this.caption && !this.image) {
        throw new Error('Cannot upload an empty thread.');
    } else {
        return next();
    }
});

const Thread =
    mongoose.models.Thread || mongoose.model('Thread', threadsSchema);

export default Thread;
