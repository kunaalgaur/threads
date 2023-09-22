import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    name: string;
    username: string | null;
    email: string;
    password: string;
    image: string | null;
    bio: string | null;
    followers: string[];
    followings: string[];
    isPrivate: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
    verifyToken: string;
    verifyTokenExpiry: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is a required feild.'],
            min: [3, 'Name must have atleast 3 charfacters.'],
            max: [20, 'Name cannot exceed 20 characters.'],
        },

        username: {
            type: String,
            default: null,
            min: [3, 'Username must have atleast 3 charfacters.'],
            max: [20, 'Username cannot exceed 20 characters.'],
            lowercase: true,
        },

        email: {
            type: String,
            required: [true, 'Email is a required field.'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (email: string) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },

                message: (props: { value: string }) =>
                    `${props.value} is not a valid email.`,
            },
        },

        password: {
            type: String,
            required: [true, 'Password is a required field.'],
            validate: {
                validator: (password: string) => {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                        password
                    );
                },

                message: () =>
                    `This password is not a secure password. Password must be alphanumeric, must contain atleast one uppercase one lowercase, and one special character`,
            },
        },

        image: {
            type: String,
            default: null, // Set to null if not provided
        },

        bio: {
            type: String,
            default: null,
        },

        followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

        followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],

        isPrivate: {
            type: Boolean,
            default: false,
        },

        forgotPasswordToken: String,

        forgotPasswordTokenExpiry: Date,

        verifyToken: String,

        verifyTokenExpiry: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE as string,
    });
};

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
