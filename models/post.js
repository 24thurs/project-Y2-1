import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: String,
        img: String,
        content: String
    },
    {
        timeStamp: true
    }
)

const Post = mongoose.model.Post || mongoose.model("Post", postSchema);

export default Post;