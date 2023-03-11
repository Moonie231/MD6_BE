import { Router } from 'express';
import {foodRouter} from "./foodRouter";
import {userRouter} from "./userRouter";
import {merchantRouter} from "./merchantRouter";

export const router = Router()
router.use('/foods',foodRouter);
router.use('/users', userRouter)
router.use('/merchants', merchantRouter)
