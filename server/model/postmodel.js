import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
    },
    postfile: {
        type: String,
    },
    fileposttype:{
        type:String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    likedby:[{type:mongoose.Schema.Types.ObjectId,ref:'Users'}],
    dislikedby:[{type:mongoose.Schema.Types.ObjectId,ref:'Users'}],
},{
    timestamps: true
}
);

const Post = mongoose.model('Post', postSchema);

export default Post;