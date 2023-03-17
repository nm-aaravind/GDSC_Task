const Course=require("../models/course")
class courseRepository{
    async createCourse(data){
        try {
            const response=await Course.create(data);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async registerCourse(data){
        try {
            const response=await Course.findOneAndUpdate({
                id:data.courseId
            },{
                capacity:capacity-1,
                students:[...students,data.regno]
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=courseRepository;