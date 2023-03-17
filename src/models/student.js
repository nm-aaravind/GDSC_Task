const mongoose=require('mongoose')
const studentSchema=mongoose.Schema({
    regno:{
        type:Number,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
},{timestamps:true})
const Student=mongoose.model('Student',studentSchema);
module.exports=Student;
