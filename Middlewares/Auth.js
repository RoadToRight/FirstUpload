import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from 'jsonwebtoken';
import { User } from "../Models/userSchema.js";

export const Authentication = catchAsyncErrors(async(req,res,next)=> {

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Not Authenticated",400))
    }

   let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user = await User.findById(decoded.id);
   next() 
}) 