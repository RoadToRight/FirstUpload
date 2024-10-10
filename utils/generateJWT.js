import { User } from "../Models/userSchema";

export const generateJWTtoken = (res,user,message) => {

    let token = user.JsonWebToken();

    if (!token) {
        return next(new ErrorHandler("Email Registration token error occured", 400))
    }



    res.status(200).cookie("token",token,{
        sameSite: 'None',
        secure:true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: false
    }).json({
        success:true,
        message:message,
        token:token,
        user
    })

}