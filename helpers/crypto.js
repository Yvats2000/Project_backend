// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');
const async = require('pbkdf2/lib/async');


const encryptPass=async(password)=>{
    // console.log(password,"==>")
       let encpass= await bcrypt.hashSync(password, saltRounds,)
       return encpass

}

async function checkUser(pass,hash) {
//    console.log(pass,hash,"==>")
    const match = await bcrypt.compareSync(pass, hash);
    // console.log(match)
     return match
    //...
}

async function getResetpassword(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    return resetToken;
}


module.exports = {
    encryptPass,
    checkUser,
    getResetpassword
}

