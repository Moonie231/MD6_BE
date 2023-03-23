"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Coupon_1 = require("../model/Coupon");
class CouponService {
    constructor() {
        this.allCoupon = async () => {
            return await this.couponRepository.find();
        };
        this.addCoupon = async (coupon) => {
            return await this.couponRepository.save(coupon);
        };
        this.Mycoupon = async (idMerchant) => {
            let sql = `select * from merchant m
                                     join coupon c on m.idMerchant = c.id_Merchant
                   where m.idMerchant = ${idMerchant} and c.role = 2 group by c.idCoupon`;
            let coupon = await this.couponRepository.query(sql);
            return coupon;
        };
        this.getCoupon = async (idCoupon) => {
            let coupon = await this.couponRepository.findOneBy({ idCoupon: idCoupon });
            if (!coupon) {
                return 'null';
            }
            return coupon;
        };
        this.editCoupon = async (idCoupon, newCoupon) => {
            await this.getCoupon(idCoupon);
            return await this.couponRepository.update({ idCoupon: idCoupon }, newCoupon);
        };
        this.deleteCoupon = async (idCoupon) => {
            await this.getCoupon(idCoupon);
            return await this.couponRepository.delete({ idCoupon: idCoupon });
        };
        this.couponRepository = data_source_1.AppDataSource.getRepository(Coupon_1.Coupon);
    }
}
exports.default = new CouponService();
//# sourceMappingURL=couponService.js.map