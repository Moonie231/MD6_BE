import {AppDataSource} from "../data-source";
import {Coupon} from "../model/Coupon";
import {CouponDetail} from "../model/couponDetail";

class CouponService {
    private couponRepository
    private couponDetailRepository

    constructor() {
        this.couponRepository = AppDataSource.getRepository(Coupon)
        this.couponDetailRepository = AppDataSource.getRepository(CouponDetail)
    }

    allCoupon = async () => {
        return await this.couponRepository.find()
    }

    addCoupon = async (coupon) => {
        return await this.couponRepository.save(coupon)
    }
    addCouponDetail = async (coupon) => {
        return await this.couponDetailRepository.save(coupon)
    }
    Mycoupon = async (idMerchant) => {
        let sql = `select *
                   from merchant m
                            join coupon c on m.idMerchant = c.id_Merchant
                   where m.idMerchant = ${idMerchant}
                     and c.role = 2
                   group by c.idCoupon`
        let coupon = await this.couponRepository.query(sql)
        return coupon
    }

    getCoupon = async (idCoupon) => {
        let coupon = await this.couponRepository.findOneBy({idCoupon: idCoupon})
        if (!coupon) {
            return 'null'
        }
        return coupon
    }

    editCoupon = async (idCoupon, newCoupon) => {
        await this.getCoupon(idCoupon)
        return await this.couponRepository.update({idCoupon: idCoupon}, newCoupon)
    }

    deleteCoupon = async (idCoupon) => {
        await this.getCoupon(idCoupon)
        return await this.couponRepository.delete({idCoupon: idCoupon})
    }

    adminCoupon = async () => {
        let sql = `select *
                   from coupon c
                   where c.role = 1`
        return await this.couponRepository.query(sql)
    }
}

export default new CouponService();