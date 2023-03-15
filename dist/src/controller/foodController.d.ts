import { Request, Response } from "express";
declare class FoodController {
    private foodService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    getAllFood: (req: Request, res: Response) => Promise<void>;
    getMyFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findCategory: (req: Request, res: Response) => Promise<void>;
    createFood: (req: Request, res: Response) => Promise<void>;
    find: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    destroy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<void>;
    findFoodByName: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: FoodController;
export default _default;
