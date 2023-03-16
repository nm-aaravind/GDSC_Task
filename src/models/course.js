import mongoose from "mongoose";
const courseSchema=new mongoose.Schema({
    name:{
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
        require:true
    }
})
const Course=mongoose.model('Course',courseSchema);
export default Course;