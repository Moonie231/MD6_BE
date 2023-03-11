import { Request, Response } from "express";
declare class UserController {
    private userServices;
    constructor();
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
