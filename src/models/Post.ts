import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.model("Post", schema);
