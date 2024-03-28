import mongoose, { Document, Schema } from "mongoose";

interface Queries extends Document {
  email: string;
  message: string;
}

const QuerySchema = new Schema<Queries>(
  {
    email: { type: String, required: true },

    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Query = mongoose.model<Queries>("Query", QuerySchema);

export default Query;
