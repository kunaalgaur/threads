import mongoose from 'mongoose';

const threadsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  caption: { type: String, default: null },
  image: { type: String, default: null },
  likes: { type: Array, default: [] },
  children: { type: Array, default: [] },
});
