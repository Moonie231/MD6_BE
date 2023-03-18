import { Router } from "express";
import UserController from "../controller/userController";
import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.post('/verify-email', UserController.verifyEmailUser)
userRouter.put('/:idUser', UserController.editUser)
userRouter.get('/my-profile/:idUser', userController.showMyProfile)
userRouter.get('/address/:idUser', userController.address)
userRouter.post('/address/add', userController.addAddress)