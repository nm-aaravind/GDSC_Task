const express=require("express")
const router=express.Router();
const studentController=require("../controllers/studentController")
const auth=require('../middlewares/auth')
const adminController=require('../controllers/adminController')

router.get('/student/signup',studentController.signUp)
router.get('/student/signin',studentController.signIn)
router.get('/student/viewcourses',auth.verifyTokenStudent,studentController.listCourses)
router.get('/student/registeredcourses',auth.verifyTokenStudent,studentController.viewRegisteredCourses)

router.patch("/student/registercourse",auth.verifyTokenStudent,studentController.registerCourse)

router.get('/admin/signin',adminController.signIn)
router.post('/admin/createcourse',auth.verifyTokenAdmin,adminController.createCourse)
router.delete('/admin/deletecourse',auth.verifyTokenAdmin,adminController.deleteCourse);

router.post('register/course',auth.verifyTokenStudent,studentController.registerCourse);
module.exports=router;