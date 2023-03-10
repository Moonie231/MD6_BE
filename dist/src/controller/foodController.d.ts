import { Request, Response } from "express";
declare class FoodController {
    private foodService;
    constructor();
    getAllFood: (req: Request, res: Response) => Promise<void>;
    getMyFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createFood: (req: Request, res: Response) => Promise<void>;
    show: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    destroy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findFoodByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: FoodController;
export default _default;
