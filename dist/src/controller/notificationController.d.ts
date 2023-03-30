import { Request, Response } from "express";
declare class MerchantController {
    private notificationRepo;
    constructor();
    getNotificationMerchant: (req: Request, res: Response) => Promise<void>;
    getNotificationUser: (req: Request, res: Response) => Promise<void>;
    countMerchant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    countUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    saveNotification: (req: Request, res: Response) => Promise<void>;
    updateSeenUser: (req: Request, res: Response) => Promise<void>;
    updateSeenMerchant: (req: Request, res: Response) => Promise<void>;
}
declare const _default: MerchantController;
export default _default;
