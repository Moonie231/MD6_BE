import { Router } from "express";
import CouponController from "../controller/couponCotroller";

export const couponRouter = Router()
couponRouter.post('', CouponController.addCoupon)
couponRouter.get('', CouponController.allCoupon)
couponRouter.get('/:idMerchant', CouponController.myCoupon)
couponRouter.get('/:idCoupon', CouponController.getCoupon)
couponRouter.put('/:idCoupon', CouponController.editCoupon)
couponRouter.delete('/:idCoupon', CouponController.deleteCoupon)