import ErrorHandler from "./error.js"

export const catchAsyncErrors = (theFunction) => {

    return (req,res,next) => {
    Promise.resolve(theFunction(req,res,next)).catch(next)
    }

}