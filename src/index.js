import express from "express";
import connect from './config/db.js'
import studentRepository from "./repository/studentRepository.js";
import router from "./routes/routes.js";

const repo=new studentRepository();
const app=express();
app.listen(3000,()=>{
    console.log("Server started on PORT 3000")
    connect().catch(err=>console.log(err));
    console.log("DB Connected");
    app.use('/api',router)
})