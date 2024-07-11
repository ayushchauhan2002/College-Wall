import mongoose from 'mongoose';
const { Schema } = mongoose;

const teacherSchema=new Schema({
    name:String,
    email:String,
    department:String,
});

export default mongoose.model('Teacher',teacherSchema);