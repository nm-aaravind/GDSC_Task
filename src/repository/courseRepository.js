
const Course=require("../models/course")
const Student=require("../models/student")
class courseRepository{
    async createCourse(data){
        try {
            const response=await Course.create({
                courseName:data.courseName,
                courseCode:data.courseCode,
                capacity:parseInt(data.capacity),
                students:[]
            });
            return response;
        } catch (error) {
            // if(error.message=)
            if(error.message.match('E11000 duplicate key error collection: gdsc.courses index: courseName_1 dup key:')){
                throw new Error("Duplicate course entry")
            }
            console.log(error)
        }
    }
    async deleteCourse(data){
        try {
            const response=await Course.findOneAndDelete(data);
            if(!response){
                throw new Error("No such course exists")
            }
            const students=await Student.find({
                _id:response.students
            })
            students.forEach((element)=>{
                element.capacity=element.capacity+1;
                element.courses.splice(element.courses.indexOf(response.id),1)
                element.save();
            })
            return true;
        } catch (error) {
            if(error.message=="No such course exists"){
                throw error
            }
            console.log(error)
        }
    }
    async registerCourse(data){
        try {
            const course=await Course.findOne({
                courseCode:data.courseCode
            });
            if(!course){
                throw new Error("No course exists");
            }
            if(course.students.includes(data.id)){
                throw new Error("Already registered")
            }
            else{
                course.capacity=course.capacity-1;
                course.students.push(data.id);
                await course.save();
                const student=await Student.findById(data.id);
                student.courses.push(course.id);
                await student.save();
                return {courseName:course.courseName,courseCode:course.courseCode}
            }
        } catch (error) {
            if(error.message=="Already registered" || error.message=="No course exists"){
                throw error;
            }
            if(error.errors.capacity.properties.message=='No more seats left'){
                throw new Error('No more seats left')
            }
            console.log(error)
        }
    }
    async listCourses(){
        try {
            const response=await Course.find();
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=courseRepository;