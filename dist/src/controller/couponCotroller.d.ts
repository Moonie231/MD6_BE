import { Request, Response } from "express";
declare class CouponController {
    private couponService;
    constructor();
    allCoupon: (req: Request, res: Response) => Promise<void>;
    addCoupon: (req: Request, res: Response) => Promise<void>;
    myCoupon: (req: Request, res: Response) => Promise<void>;
    getCoupon: (req: Request, res: Response) => Promise<void>;
    editCoupon: (req: Request, res: Response) => Promise<void>;
    deleteCoupon: (req: Request, res: Response) => Promise<void>;
    adminCoupon: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CouponController;
export default _default;
