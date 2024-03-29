import { Request, Response } from "express";
declare class OrderController {
    private orderService;
    constructor();
    deleteCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOrder: (req: Request, res: Response) => Promise<void>;
    setStatusConfirm: (req: any, res: any) => Promise<any>;
    setStatusCancelled: (req: any, res: any) => Promise<any>;
    setStatusSuccess: (req: any, res: any) => Promise<any>;
    showCart: (req: Request, res: Response) => Promise<void>;
    addCart: (req: Request, res: Response) => Promise<void>;
    addOrder: (req: Request, res: Response) => Promise<void>;
    editOrder: (req: Request, res: Response) => Promise<void>;
    findByStatus: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    findByIdOrder: (req: Request, res: Response) => Promise<void>;
    countCart: (req: Request, res: Response) => Promise<void>;
    myOrderFood: (req: Request, res: Response) => Promise<void>;
    myOrder: (req: Request, res: Response) => Promise<void>;
    orderDetail: (req: Request, res: Response) => Promise<void>;
    findByOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderController;
export default _default;
