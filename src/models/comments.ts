import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  post: Schema.Types.ObjectId;
  description: string;
}

const commentSchema = new Schema<IComment>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
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
