import { Router } from "express";
import UserController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)