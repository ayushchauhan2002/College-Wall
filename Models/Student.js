import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
