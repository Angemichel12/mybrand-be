import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  blog: Schema.Types.ObjectId;
  description: string;
  author: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Blog is required"],
    },

    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Author is Required"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
