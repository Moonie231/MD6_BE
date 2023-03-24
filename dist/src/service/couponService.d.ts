declare class CouponService {
    private couponRepository;
    constructor();
    allCoupon: () => Promise<any>;
    addCoupon: (coupon: any) => Promise<any>;
    Mycoupon: (idMerchant: any) => Promise<any>;
    getCoupon: (idCoupon: any) => Promise<any>;
    editCoupon: (idCoupon: any, newCoupon: any) => Promise<any>;
    deleteCoupon: (idCoupon: any) => Promise<any>;
    useCoupon: (idMerchant: any) => Promise<void>;
}
declare const _default: CouponService;
export default _default;
