import mongoose, { Schema, Document } from "mongoose";

interface ILike extends Document {
  user: Schema.Types.ObjectId;
  blogId: Schema.Types.ObjectId;
}

const LikeSchema = new Schema<ILike>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILike>("Like", LikeSchema);
