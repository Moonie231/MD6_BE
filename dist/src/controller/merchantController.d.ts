import { Request, Response } from "express";
declare class MerchantController {
    private merchantService;
    constructor();
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editMerchant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMerchantActive: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMerchantPending: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMerchant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    setStatus: (req: any, res: any) => Promise<any>;
    statisticsByStatus: (req: any, res: any) => Promise<any>;
    statisticsByFood: (req: any, res: any) => Promise<any>;
    statisticsByUser: (req: any, res: any) => Promise<any>;
    statisticsByWeek: (req: any, res: any) => Promise<any>;
    statisticsByMonth: (req: any, res: any) => Promise<any>;
    statisticsByYear: (req: any, res: any) => Promise<any>;
}
declare const _default: MerchantController;
export default _default;
