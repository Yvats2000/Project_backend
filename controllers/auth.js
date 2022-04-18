const db = require('../db/db.js')
const {generateToken} = require('../utils/generateToken')
const {encryptPass, checkUser, getResetpassword} = require('../helpers/crypto');
const async = require('pbkdf2/lib/async');


async function register(req, res)  {
    const { data } = req.body;
    try {
        let user={
            "userName": data.userName,
            "email": data.email,
            "password": await encryptPass(data.password)
         }
        const userdata=await db.User.findOne({where:{"email":user.email}})
        if(!userdata){
            const registerUser = await db.User.create(user)
            res.status(200).json({"status":true,token: generateToken(user.id), "message" : "api works"})
        }else {
            res.status(200).json({"status":false,"message" : "user already exist"})
        }
    } catch (error) {
        res.status(200).json({"status":false,"message" : "user already exist"})
}
}

async function login(req, res) {
    const { data } = req.body
    if(!data.email || !data.password){
        res.send({"status": false, "message":"please provide and password"})
    }
    try {
      const users = await db.User.findOne({where:{"email":data.email}});
      // console.log(users)
      if(!users){
         res.status(404).json({"status":false,"message":"user not found"})
      }else{
         let password=users.password;
         let compare=await checkUser(data.password,password);
         if(users&& compare){
            res.status(200).json({"status":true,"Message":"Login Successfully",userName : users.userName,
                                                id : users.id ,           
                                                email : users.email, 
                                                password: users.password,
                                                token :generateToken(users.id)})
         }else{
            res.status(201).json({"status":false,"message":"password incorrect"})
         }
      }
        res.send("login Route")
    } catch (error) {
        
    }

}

async function forgetPassword(req, res) {
    const { data } = req.body
    try {
        const users = await db.User.findOne({where: {"email": data.email}})
        if(users){
        let encpassword = await encryptPass(data.password)
        let updatedpass = await db.User.update({"password":encpassword},{where:{"email":data.email}})
        let userid = generateToken(users.id)

        res.status(201).json({"status":true, "user":userid})
        }
    } catch (error) {
        res.send("api fails")
    }
}

async function emailSend(req, res, next) {
    const { data } = req.body
        try {
            const users = await db.User.findOne({where: {"email": data.email}})
            if(users){
                let otpcode = Math.floor((Math.random()*10000)+ 1);
                let expire =  new Date().getTime() + 300*1000;
                let otpData = {
                    "email" : data.email,
                    "code" : otpcode,
                    // "expireIn": expire
                }
                console.log(otpData)
                const sendMail = await db.Otp.create(otpData);
                await mailer(data.email, otpcode)
                res.status(201).json({"status":true,"message":"Please check your email Id"})
            }
        }
    catch (error) {
        res.status(201).json({"status":false,"message":"Enter the valid email"})
    }
        
}


async function getuserProfile(req, res) {
    // res.status(200).json({'message':"api works"})
    let userId=res.locals['userId']
    console.log(userId,'==')
    const users = await db.User.findOne({where:{"id":userId}})

    res.status(200).json({"status":true,user:users.userName,
                                        email:users.email,
                                        admin:users.admin})
}

async function mailer(email, otp){
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        port: 587,
        secure: false,
        auth:{
            user :email,
            pass:otp
        }
    })
    var mailOption = {
        from: email,
        to:email,
        subject: 'sending Email  usinf node.js',
        text : 'ThankYOu Sir'
    };

    transporter.sendMail(mailOption, function(error,info){
        if(error) {
            console.log(error)
        } else {
            console,log('Email sent: ' + info.response)
        }
    })
}
module.exports = {
    register,
    login,
    forgetPassword,
    getuserProfile,
    emailSend
}