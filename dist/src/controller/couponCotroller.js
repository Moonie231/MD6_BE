"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const couponService_1 = __importDefault(require("../service/couponService"));
class CouponController {
    constructor() {
        this.allCoupon = async (req, res) => {
            try {
                let coupon = await this.couponService.allCoupon();
                res.status(200).json(coupon);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.addCoupon = async (req, res) => {
            try {
                let coupon = await this.couponService.addCoupon(req.body);
                res.status(201).json(coupon);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.myCoupon = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let coupon = await this.couponService.Mycoupon(idMerchant);
                res.status(200).json(coupon);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getCoupon = async (req, res) => {
            try {
                let idCoupon = req.params.idCoupon;
                let coupon = await this.couponService.getCoupon(idCoupon);
                res.status(200).json(coupon);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editCoupon = async (req, res) => {
            try {
                let idCoupon = req.params.idCoupon;
                let newCoupon = await this.couponService.editCoupon(idCoupon, req.body);
                res.status(200).json(newCoupon);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.deleteCoupon = async (req, res) => {
            try {
                let idCoupon = req.params.idCoupon;
                let response = await this.couponService.deleteCoupon(idCoupon);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.adminCoupon = async (req, res) => {
            try {
                console.log(1);
                let coupon = await this.couponService.adminCoupon();
                res.status(200).json(coupon);
            }
            catch (e) {
                console.log(e.message);
                res.status(500).json(e.message);
            }
        };
        this.couponService = couponService_1.default;
    }
}
exports.default = new CouponController();
//# sourceMappingURL=couponCotroller.js.map