import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  blog: Schema.Types.ObjectId;
  description: string;
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
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
