import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";

//import Routers
import studentRoutes from "./Routes/studentRoutes.js";
import postRoutes from "./Routes/postRoutes.js";

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/student',studentRoutes);
app.use('/post',postRoutes);

app.listen(port,()=>{
    console.log("listening on port",port);
})
