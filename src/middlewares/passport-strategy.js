const passport = require('passport');
const Student=require("../models/student")

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'gdsctask';

function passportVerify(passport){
    try {
        passport.use(new JwtStrategy(opts,async (jwt_payload,done)=>{
            console.log(jwt_payload,"Hiji")
            const student=await Student.findOne({_id:jwt_payload.id,regno:jwt_payload.registerno})
                if(student){
                    return done(null,student);
                }
                else{
                    return done(null,false)
                }
            }));
    } catch (error) {
        console.log(error)
        throw error;   
    }
}
module.exports=passportVerify;