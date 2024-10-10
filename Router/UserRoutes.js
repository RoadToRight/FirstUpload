import express from 'express'
import {register, SendEmail} from "../Controllers/userController.js";
import { Authentication } from '../Middlewares/Auth.js';


const router = express.Router()

router.post("/register",register);
router.post("/send/Email",SendEmail)
// router.post("/login",login);
// router.post("/forgotPassword",forgotPassword)
// router.get("/resetPassword/:token",resetPassword)
// router.post("/Password/Change",PasswordChangeApi)
// router.get("/logout",Authentication,logout)

export default router;