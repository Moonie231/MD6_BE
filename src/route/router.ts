import { Router } from 'express';
import {foodRouter} from "./foodRouter";
import {userRouter} from "./userRouter";
import {merchantRouter} from "./merchantRouter";
import {adminRouter} from "./adminRouter";
import {categoryRouter} from "./categoryRouter";
import {orderRouter} from "./orderRouter";
import {couponRouter} from "./couponRouter";
import {notification} from "./notificationRouter";

export const router = Router()
router.use('/foods',foodRouter);
router.use('/users', userRouter)
router.use('/merchants', merchantRouter)
router.use('/admin', adminRouter)
router.use('/categories',categoryRouter);
router.use('/orders', orderRouter);
router.use('/coupons', couponRouter);
router.use('/notifications',notification);