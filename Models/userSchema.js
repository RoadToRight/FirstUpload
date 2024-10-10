import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from "crypto"



const UserSchema = new mongoose.Schema({

    auth0Id:{
        type:String,
        required:[true,"authIdentitiy is required!"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
       
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email_verified:{
        type:String,
        required:true,
    }
    ,nickname:{
        type:String,
        required:true,
    }
    ,picture:{
        type:String,
    }
    ,created_at:{
        type:String,
    },
    // password:{
    //     type:String,
    //     minLength:[8,"Length must be 8 characters long"],
    //     required:[true,"Password is required"],
    //     select:false
    // }
    
    resetPasswordToken:{type:String,default:""}
    ,
    resetPasswordExpire:{type:Date,default:""}
   

},{timestamps:true})



UserSchema.methods.JsonWebToken = function(){

    return jwt.sign(
        { id: this._id }, // Payload containing the user's ID
        process.env.JWT_SECRET_KEY, // Secret key from environment variables
        { expiresIn: process.env.JWT_EXPIRE } // Expiration time from environment variables
      );

}

UserSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
  this.password =  await bcrypt.hash(this.password,10)

})
UserSchema.pre("updateOne", async function (next) {
    let update = this.getUpdate();
    
    // If the update contains a $set operator, check inside it for the password field
    if (update.$set && update.$set.password) {
        update.$set.password = await bcrypt.hash(update.$set.password, 10);
    } else if (update.password) {
        // In case password is set directly
        update.password = await bcrypt.hash(update.password, 10);
    }

    next();
});

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("Hex");
    this.resetPasswordExpire = Date.now() + 15 *60 *1000;

    return resetToken;


}

export const User = mongoose.model("Users",UserSchema) ;