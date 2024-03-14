import mongoose, { Schema, Document } from "mongoose";
interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  comments: mongoose.Types.ObjectId[];
}
const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Michel" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);
