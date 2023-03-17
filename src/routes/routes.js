const express=require("express")
const router=express.Router();
const studentController=require("../controllers/studentController")
const { passportAuthenticate }=require("../middlewares/passport")
const studentService=require("../services/studentService")
let n=new studentService();

router.get('/signUp/student',studentController.signUp)
router.get('/signIn/student',studentController.signIn)
// router.post('register/course',studentController.register);
router.get('/test',n.verifyToken,(req,res)=>{
    return res.status(200).json({
        message:"success"
    })
})
module.exports=router;