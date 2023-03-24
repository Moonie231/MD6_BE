import {Request, Response} from "express";
import foodService from "../service/foodService"
import categoryService from "../service/categoryService";

class FoodController {
    private foodService;
    constructor() {
        this.foodService = foodService;
    }
    getAll= async (req: Request, res: Response) => {
        try {
            let limit = 8;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let totalBlogs = await foodService.count();
            const count = parseInt(totalBlogs[0]['count(idFood)']);
            let totalPage = Math.ceil( count/limit);
            let foods = await foodService.getAll(limit, offset);
            let categories = await categoryService.getAllCategory();
            res.status(200).json({
                foods:foods,
                currentPage: page,
                totalPage: totalPage
            });

        }
        catch (e) {
            res.status(500).json(e.message);
        }
    }
    getAllFood = async (req: Request, res: Response) => {
        try {
            let data;
            let foods = await foodService.getAllFood();
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
                data = [foods,categories];
            } else {
                data = [foods,categories];
            }
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    getMyFood = async (req: Request, res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let foods = await foodService.getMyFood(idMerchant);
            return res.status(201).json(foods);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories = await categoryService.getAllCategory();
            res.status(200).json(categories);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    createFood = async (req: Request, res: Response) => {
        try {
            let foods = await foodService.save(req.body);
            res.status(200).json(foods);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    find = async (req: Request, res: Response) => {
        let idFood = req.params.idFood;
        let foods = await foodService.findById(idFood);
        return res.status(201).json(foods);
    }

    destroy = async (req: Request, res: Response) => {
        let idFood = req.params.idFood;
        let food = await foodService.deleteFood(idFood);
        return res.status(200).json(food);
    }

    update = async (req: Request, res: Response) => {
        let idFood = req.params.idFood;
        let newFood = req.body;
        await this.foodService.update(idFood, newFood);
        res.status(200).json('Success!')
    }

    findFoodByName = async (req: Request,res: Response) => {
        try {
            let nameFood=req.body
            let foods = await foodService.findFoodByNameFood(nameFood.nameFood);
            return res.status(200).json({foods:foods})

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    updateQuantity = async (req: Request,res: Response) => {
        try {
            let id=req.params.id
            let foods = await foodService.updateQuantity(id)
            return res.status(200).json(foods)

        } catch (err) {
            res.status(500).json(err.message);
        }
    }

}
export default new FoodController();