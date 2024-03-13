import mongoose, { Schema, Document } from "mongoose";

interface IComment {
  user: string;
  comment: string;
  createdAt: Date;
}
interface ILike {
  user: string;
  createdAt: Date;
}

interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  comments: IComment[];
  likes: ILike[];
}
const LikeSchema: Schema = new Schema({
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema: Schema = new Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
