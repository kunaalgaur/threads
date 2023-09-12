import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    bio: { type: String },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    resposts: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
