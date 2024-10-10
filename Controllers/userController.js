import cookieParser from "cookie-parser";
import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from '../Models/userSchema.js'
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer"



export const register = catchAsyncErrors(async (req, res, next) => {

    const { auth0Id,email, name,email_verified,nickname,picture,created_at} = req.body;
    
    // sharedData.password = password;

    if (!auth0Id || !email || !name) {
        return next(new ErrorHandler("Email Name And Authentication Required!"))
    }
     try{
          let CreateUser = await User.create({name:"Hello"})
     }catch(e){
          res.status(200).json({
        success: true,
        message: `${e}`
    })
     }
      
         
        // if(CreateUser){
        //     res.status(200).json({
        //         success:true,
        //         message:"User Registered!"
        //       })
        // }
       
       
      
    
    // const emailRegisterVerify = `${process.env.DASHBOARD_URL}/emailRegister/verify/${token}`
    // sendEmail(email, emailRegisterVerify)

    res.status(200).json({
        success: true,
        message: `Email Sent To ${email}`
    })








})

// export const registerEmailVerify = catchAsyncErrors(async (req, res, next) => {


//     const { token } = req.params;

//     if (!token) {
//         return next(new ErrorHandler("Token Not Verified", 400))
//     }
//     let registerEmailVerifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     if (!registerEmailVerifyToken) {
//         return next(new ErrorHandler("Email Not Verified", 400))
//     }

//     console.log(sharedData)
//     let emailV = sharedData.email;
//     let nameV = sharedData.name;
//     let passwordV = sharedData.password;

//     const user = await User.create({ email: emailV, name: nameV, password: passwordV });
//     if (!user) {
//         return next(new ErrorHandler("Something went wrong Try Again!"))
//     }

//     await user.save()

//     res.status(200).cookie("token", token, {

//         sameSite: 'None',
//         secure:true,
//         expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//         httpOnly: false
        
//     }).json({
//         success: true,
//         message: "User Registered"
//     })

// })

// export const login = catchAsyncErrors(async (req, res, next) => {

//     const { email, password } = req.body;
//     if (!email || !password) {
//         return next(new ErrorHandler("Email and Password are required", 400))
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//         return next(new ErrorHandler("No User Found", 400))
//     }

//     const comparePassword = await user.comparePassword(password);

//     if (!comparePassword) {
//         return next(new ErrorHandler("Email or Password is incorrect", 400))
//     }

//     generateJWTtoken(res, user, "User Logged In")




// })

// export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
//     const { email } = req.body;
//     sharedData.emailForgot = email;
//     let user = await User.findOne({ email: email });
//     if (!user) {
//         return next(new ErrorHandler("No Email Found"), 404)
//     }


//     let resetToken = user.getResetPasswordToken();
//     await user.save()



//     const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`



//     sendEmail(email, resetPasswordUrl)
//     res.status(200).json({

//         success: true,
//         message: `Email sent to ${user.email} successfully`,
     
//     })

// })

// export const resetPassword = catchAsyncErrors(async (req, res, next) => {

//     const { token } = req.params;
    
//     const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

//     const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

//     if (!user) {
//         return next(new ErrorHandler("Token is Invalid or has been expired!", 400))
//     }

   
//     user.resetPasswordExpire = undefined;
//     user.resetPasswordToken = undefined;

//     await user.save();

//     res.status(200).json({

//         success: true,
//         message: `Email Verified Successfully`

//     })

// })

// export const PasswordChangeApi = catchAsyncErrors(async(req,res,next) => {

//     const {Newpassword,Confirmpassword} = req.body;
//     let email =  sharedData.emailForgot;
//     console.log(email)
//     if(Newpassword !== Confirmpassword){
//         res.status(404).json({

//             success: false,
//             message: `New Password And Confirm Password Not Matched!`
    
//         })
//     }

//     const user = await User.updateOne({email:email},{$set:{password:Newpassword}})
    
//     if(!user){
//         return next(new ErrorHandler("Some thing went wrong while updating password",400))
//     }
    

//     res.status(200).json({

//         success: true,
//         message: `Password Updated Successfully!`

//     })


// })

// export const logout = catchAsyncErrors(async (req, res, next) => {

    
//     res.cookie('token', '', { expires: new Date(0), httpOnly: true })
//     res.status(200).json(
//         {
//             success: true,
//             message: 'Logged out!'
//         }
//     );

// })

export const SendEmail = catchAsyncErrors(async (req,res,next) =>{

    const {email,phoneNumber,name,message,Subject} = req.body;

    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        secure:false,
        requireTLS:true,
        auth: {
          user: 'syedsameershah2008@gmail.com',
          pass: 'idrc plph zzvt iymi'
        }
      });
      
      var mailOptions = {
        from: email,
        to: 'syedsameershah2008@gmail.com',
        subject: `${Subject}`,
        html: `${message}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.status(200).json({
                success:true,
                message:"Email Sent Successfully!"
            })
          console.log('Email sent: ' + info.response);
        }
      });

})
