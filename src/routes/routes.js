const express=require("express")
const router=express.Router();
const studentController=require("../controllers/studentController")
const auth=require('../middlewares/auth')
const adminController=require('../controllers/adminController')

router.post('/students/signup',studentController.signUp)
router.post('/students/signin',studentController.signIn)
router.post('/admin/signin',adminController.signIn)
router.post('/admin/courses',auth.verifyTokenAdmin,adminController.createCourse)
router.post("/students/courses",auth.verifyTokenStudent,studentController.registerCourse)

router.get('/students/courses',auth.verifyTokenStudent,studentController.listCourses)
router.get('/students/registeredcourses',auth.verifyTokenStudent,studentController.viewRegisteredCourses)

router.patch('/admin/courses',auth.verifyTokenAdmin,adminController.addStudentRegistration)
router.patch('/admin/removecourses',auth.verifyTokenAdmin,adminController.removeStudentRegistration)

router.delete('/admin/courses',auth.verifyTokenAdmin,adminController.deleteCourse);

module.exports=router;