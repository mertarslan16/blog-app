

import mongoose, { Document } from 'mongoose';

export interface Post extends Document {
  _id: string;
  title: string;
  content: string;
  preview: string;
}

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  preview: { type: String, required: true },
});

export default mongoose.model<Post>('Post', postSchema);
