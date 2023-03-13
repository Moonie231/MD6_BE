import { Request, Response } from "express";
declare class MerchantController {
    private merchantService;
    constructor();
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editMerchant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: MerchantController;
export default _default;
