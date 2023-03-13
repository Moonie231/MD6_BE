import { Router } from 'express';
import {foodRouter} from "./foodRouter";
import {userRouter} from "./userRouter";

export const router = Router()
router.use('/foods',foodRouter);
router.use('/users', userRouter)
