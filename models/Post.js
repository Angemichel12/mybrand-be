import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", schema);

export default Post;
