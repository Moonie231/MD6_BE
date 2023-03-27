declare class CouponService {
    private couponRepository;
    private couponDetailRepository;
    constructor();
    allCoupon: () => Promise<any>;
    addCoupon: (coupon: any) => Promise<any>;
    addCouponDetail: (coupon: any) => Promise<any>;
    Mycoupon: (idMerchant: any) => Promise<any>;
    getCoupon: (idCoupon: any) => Promise<any>;
    editCoupon: (idCoupon: any, newCoupon: any) => Promise<any>;
    deleteCoupon: (idCoupon: any) => Promise<any>;
    adminCoupon: () => Promise<any>;
}
declare const _default: CouponService;
export default _default;
