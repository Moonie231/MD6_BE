import CouponService from "../service/couponService";
import {request, Request, Response} from "express";

class CouponController {
    private couponService;

    constructor() {
        this.couponService = CouponService;
    }

    allCoupon = async (req: Request, res: Response) => {
        try {
            let coupon = await this.couponService.allCoupon()
            res.status(200).json(coupon);
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    addCoupon = async (req: Request, res: Response) => {
        try{
            let coupon = await this.couponService.addCoupon(req.body)
            res.status(201).json(coupon);
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    myCoupon = async (req: Request, res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let coupon = await this.couponService.Mycoupon(idMerchant)
            res.status(200).json(coupon);
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    getCoupon = async (req: Request, res: Response) => {
        try {
            let idCoupon = req.params.idCoupon
            let coupon = await this.couponService.getCoupon(idCoupon)
            res.status(200).json(coupon);
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    editCoupon = async (req: Request, res: Response) =>{
        try {
            let idCoupon = req.params.idCoupon
            let newCoupon = await this.couponService.editCoupon(idCoupon, req.body)
            res.status(200).json(newCoupon);
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    deleteCoupon = async (req: Request, res: Response) =>{
        try {
            let idCoupon = req.params.idCoupon
            let response = await this.couponService.deleteCoupon(idCoupon)
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    adminCoupon = async (req: Request, res: Response) => {
        try {
            let coupon = await this.couponService.adminCoupon()
            res.status(200).json(coupon)
        }catch (e) {
            console.log(e.message)
            res.status(500).json(e.message)
        }
    }
}

export default new CouponController()