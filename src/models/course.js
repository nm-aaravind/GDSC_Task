const mongoose=require("mongoose")
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        require:true,
        unique:true
    },
    courseCode:{
        type:String,
        require:true,
        unique:true
    },
    capacity:{
        type:Number,
        require:true,
        unique:false,
        min:[0,"No more seats left"]
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }]
})
const Course=mongoose.model('Course',courseSchema);
module.exports=Course;