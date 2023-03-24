import {AppDataSource} from "../data-source";
import {Coupon} from "../model/Coupon";

class CouponService {
    private couponRepository

    constructor() {
        this.couponRepository = AppDataSource.getRepository(Coupon)
    }

    allCoupon = async () => {
        return await this.couponRepository.find()
    }

    addCoupon = async (coupon) => {
        return await this.couponRepository.save(coupon)
    }

    Mycoupon = async (idMerchant) => {
        let sql = `select * from merchant m
                                     join coupon c on m.idMerchant = c.id_Merchant
                   where m.idMerchant = ${idMerchant} and c.role = 2 group by c.idCoupon`
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
}

export default new CouponService();