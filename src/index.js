const express=require('express')
const connect=require("./config/db")
const router=require("./routes/routes.js")
const studentService=require("./services/studentService.js")
const studentController=require("./controllers/studentController")
const bodyParser=require("body-parser")
const passport = require('passport')
const passportVerify=require("./middlewares/passport-strategy")


let nn=new studentService();


// const repo=new studentRepository();
const app=express();
app.listen(3000,async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(passport.initialize());
    passportVerify(passport)
    console.log("Server started on PORT 3000")
    connect().catch(err=>console.log(err));
    console.log("DB Connected");
    app.use('/api',router)
    // const token=nn.createToken({regno:125156001,password:"hehe"})
    // console.log(token)
    // const response=nn.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdubyI6MTI1MTU2MDAxLCJwYXNzd29yZCI6ImhlaGUiLCJpYXQiOjE2NzkwNTk2OTgsImV4cCI6MTY3OTA2MzI5OH0.X5nJWaHifgKfZ5_9qa1CWglGd8JBtWaoQrzbw-XcI0g");
    // console.log(response)
})