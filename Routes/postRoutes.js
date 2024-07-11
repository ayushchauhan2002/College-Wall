//import Models
import Student from "../Models/Student.js";
import Post from "../Models/Post.js";
import Teacher from "../Models/Teacher.js";
import express from "express";
import _ from "lodash";
import nodemailer from "nodemailer";
const router=express.Router();

const thresholdVotes=2;

function mailTeacher(receiverEmail,senderInfo,message){
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wallcollege2@gmail.com',
        pass: 'gkta lqgk ipda djwt'
    }
    });
    
    var mailOptions = {
    from: 'wallcollege2@gmail.com',
    to: receiverEmail,
    subject: "An issue has been raised concerning you",
    text: `${senderInfo.name}(${senderInfo.branch},${senderInfo.batch}) has raised an issue:\n ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

router.post('/create',async (req,res)=>{
    try {
        const postData=req.body;
        await Post.create(postData);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/',async (req,res)=>{
    try {
        const response=await Post.find();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.patch('/like/:postid', async (req, res) => {
    try {
        const postId = req.params.postid;
        const studentId = (req.body.studentId).toString();
        const post = await Post.findById(postId);
        if (post.votes.includes(studentId)) {
            await Post.updateOne(
                { _id: postId },
                { $pull: { votes: studentId } }
            );
            res.json((post.votes.length-1));
            res.sendStatus(200);
        } else {
            await Post.updateOne(
                { _id: postId },
                { $push: { votes: studentId } }
            );
            const updatedPost = await Post.findById(postId);
            if (updatedPost.votes.length == thresholdVotes) {
                const sender = await Student.findById(updatedPost.senderId);
                const senderInfo = {
                    name: sender.name,
                    branch: sender.branch,
                    batch: sender.batch
                };
                const teacher = await Teacher.findById(updatedPost.sendTo);
                mailTeacher(teacher.email, senderInfo, updatedPost.message);
            }
            res.sendStatus(200);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:postId',async (req,res)=>{
    try {
        const id=req.params.postId;
        await Post.deleteOne({_id:id});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;