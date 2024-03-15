import mongoose, { Schema, Document } from "mongoose";

interface ILike extends Document {
  userEmail: string;
  blogId: Schema.Types.ObjectId;
}

const LikeSchema = new Schema<ILike>(
  {
    userEmail: {
      type: String,
      required: true,
      ref: "User", // assuming User is your user model
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // assuming Blog is your blog model
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILike>("Like", LikeSchema);
