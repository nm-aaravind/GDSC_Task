require('dotenv').config();
module.exports={
    JWT_SALT:process.env.JWT_SALT,
    PORT:process.env.PORT,
    ADMIN_USER_ID:process.env.ADMIN_USER_ID,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD
}