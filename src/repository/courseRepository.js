const DefinedError=require("../utils/error")
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
            if(error.message.match('E11000 duplicate key error collection: gdsc.courses index: courseName_1 dup key:')){
                throw new DefinedError("Duplicate course entry",500)
            }
            throw error;
        }
    }
    async deleteCourse(data){
        try {
            const response=await Course.findOneAndDelete(data);
            if(!response){
                throw new DefinedError("Course Not Found",404)
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
            if(error.message=="Course Not Found"){
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
                throw new DefinedError("Course Not Found",404);
            }
            if(course.students.includes(data.id)){
                throw new DefinedError("Already registered",500)
            }
            else{
                course.capacity=course.capacity-1;
                course.students.push(data.id);
                await course.save();
                const student=await Student.findOne({
                    regno:data.regno
                });
                student.courses.push(course.id);
                await student.save();
                return {courseName:course.courseName,courseCode:course.courseCode}
            }
        } catch (error) {
            if(error.message=="Already registered" || error.message=="Course Not Found"){
                throw error;
            }
            if(error.errors.capacity.properties.message=='No more seats left'){
                throw new Error('No more seats left')
            }
            throw error;
        }
    }
    async removeStudentRegistration(data){
        try {
            const response=await Course.findOne({
                courseName:data.courseName,
                courseCode:data.courseCode
            });
            if(!response){
                throw new DefinedError("Course Not Found",404)
            }
            const student=await Student.findOne({
                regno:data.regno
            })
            if(!student){
                throw new DefinedError("Student Not Found",404)
            }
            if(!(response.students.includes(student.id) && student.courses.includes(response.id))){
                throw new DefinedError("Student not registered for the course",400)
            }
            response.students.splice(response.students.indexOf(student.id),1)
            student.courses.splice(student.courses.indexOf(response.id),1)
            console.log(response,student)
            await response.save();
            await student.save();
            return true;
        } catch (error) {
            throw error
        }
    }
    async listCourses(){
        try {
            const response=await Course.find().select(['courseName','courseCode','capacity','-_id']);
            return response
        } catch (error) {
            throw error;
        }
    }
}
module.exports=courseRepository;