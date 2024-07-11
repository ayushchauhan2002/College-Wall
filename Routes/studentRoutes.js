//import Models
import Student from "../Models/Student.js";
import Post from "../Models/Post.js";
import Teacher from "../Models/Teacher.js";
import express from "express";
const router=express.Router();

router.post('/register',async (req,res)=>{
    try {
        const {name,email,rollNo,password,branch,batch}=req.body;
        if(!(name&&email&&rollNo&&password&&branch&&batch)){
            res.status(400).send("all fields are compulsory");
        }
        else{
            const existingEmail=await Student.findOne({email:email});
            const existingRollNo=await Student.findOne({rollNo:rollNo});
            if(existingEmail || existingRollNo){
                res.status(400).send("unique email and roll no. required");
            }
            else{
                const data=await Student.create(req.body);
                res.status(200).send(data);
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/login',async (req,res)=>{
    try {
        const userEmail=req.body.email;
        const response=await Student.findOne({email:userEmail});
        if(!response){
            res.send("user doesn't exist");
        }
        else{
            const password=req.body.password;
            if(response.password==password){
                res.send(response);
            }
            else{
                res.send("incorrect password");
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/profile/:studentId',async (req,res)=>{
    try {
        const id=req.params.studentId;
        const data=await Student.findById(id);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;