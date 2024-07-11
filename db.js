import mongoose from "mongoose";
const db=mongoose.connect("mongodb://localhost:27017/CollegeWall");

export default db;