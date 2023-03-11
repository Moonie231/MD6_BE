import { Router } from "express";
import UserController from "../controllers/userController";

export const userRouter = Router();
userRouter.post('/register', UserController.register)