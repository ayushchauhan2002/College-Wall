import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema= new Schema({
    message:String,
    sendTo:{
        type:mongoose.ObjectId,
        required:true
    },
    senderId:{
        type:mongoose.ObjectId,
        required:true
    },
    votes:[String],
}, {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);
export default Post;
