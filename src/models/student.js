import mongoose from "mongoose";
const studentSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    regno:{
        type:Number,
        unique:true,
        require:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
},{timestamps:true})
const Student=mongoose.model('Student',studentSchema);
export default Student;
