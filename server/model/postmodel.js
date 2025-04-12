import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    postfile: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
},{
    timestamps: true
}
);

const Post = mongoose.model('Post', postSchema);

export default Post;