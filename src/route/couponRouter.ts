import { Router } from "express";
import CouponController from "../controller/couponCotroller";
import CouponService from "../service/couponService";

export const couponRouter = Router()
couponRouter.post('', CouponController.addCoupon)
couponRouter.get('', CouponController.allCoupon)
couponRouter.get('/:idMerchant', CouponController.myCoupon)
couponRouter.get('/:idCoupon', CouponController.getCoupon)
couponRouter.put('/:idCoupon', CouponController.editCoupon)
couponRouter.delete('/:idCoupon', CouponController.deleteCoupon)
couponRouter.get('/admin/coupon', CouponController.adminCoupon)