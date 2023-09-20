import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  username: string | null;
  email: string;
  password: string;
  image: string | null;
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
      sparse: true, // Allow null values to be unique
      required: [true, 'Username is a required field.'],
      min: [3, 'Username must have atleast 3 charfacters.'],
      max: [20, 'Username cannot exceed 20 characters.'],
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is a required field.'],
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

        message: (props: { value: string }) =>
          `${props.value} is not a secure password. Password must be alphanumeric, must contain atleast one uppercase one lowercase, and one special character`,
      },
    },

    image: {
      type: String,
      default: null, // Set to null if not provided
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
