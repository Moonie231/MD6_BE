import { Request, Response } from "express";
declare class UserController {
    private userServices;
    constructor();
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    verifyEmailUser: (req: any, res: any) => Promise<any>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    address: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
