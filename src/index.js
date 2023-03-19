const express=require('express')
const connect=require("./config/db")
const router=require("./routes/routes.js")
const env=require("./config/dotenv")
const bodyParser=require("body-parser")

const app=express();
app.listen(env.PORT,async ()=>{
    console.log("Server started on PORT",env.PORT)
    if(await connect()){
        console.log("Connected to DB")
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
        app.use('/api',router)
    }
    else{
        console.log("Internal DB Error");
    }
})