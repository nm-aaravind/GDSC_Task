const express=require('express')
const connect=require("./config/db")
const router=require("./routes/routes.js")
const env=require("./config/dotenv")
const studentService=require("./services/studentService.js")
const studentController=require("./controllers/studentController")
const bodyParser=require("body-parser")




// const repo=new studentRepository();
const app=express();
app.listen(env.PORT,async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    console.log("Server started on PORT",env.PORT)
    connect().catch(err=>{
        throw new Error("DB Connection Error")
    });
    console.log("DB Connected");
    app.use('/api',router)
})