const passport=require('passport')
function passportAuthenticate(req,res,next){
    passport.authenticate('jwt',(err,student)=>{
        if(err) next(err)
        if(!student){
            return res.status(400).json({
                message:"Unauthorized access"
            })
        }
        req.student=student;
        next();
    })(req,res,next)
}
module.exports={
    passportAuthenticate
};