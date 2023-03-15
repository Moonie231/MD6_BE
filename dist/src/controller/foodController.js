"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodService_1 = __importDefault(require("../service/foodService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
const categoryService_2 = __importDefault(require("../service/categoryService"));
class FoodController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let limit = 8;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalBlogs = await foodService_1.default.count();
                const count = parseInt(totalBlogs[0]['count(idFood)']);
                let totalPage = Math.ceil(count / limit);
                let foods = await foodService_1.default.getAll(limit, offset);
                let categories = await categoryService_1.default.getAllCategory();
                res.status(200).json({
                    foods: foods,
                    currentPage: page,
                    totalPage: totalPage
                });
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAllFood = async (req, res) => {
            try {
                let data;
                let foods = await foodService_1.default.getAllFood();
                let categories = await categoryService_1.default.getAllCategory();
                if (req["decoded"]) {
                    data = [foods, categories];
                }
                else {
                    data = [foods, categories];
                }
                res.status(200).json(foods);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getMyFood = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let foods = await foodService_1.default.getMyFood(idMerchant);
                return res.status(201).json(foods);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findCategory = async (req, res) => {
            try {
                let categories = await categoryService_2.default.getAllCategory();
                res.status(200).json(categories);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createFood = async (req, res) => {
            try {
                let foods = await foodService_1.default.save(req.body);
                res.status(200).json(foods);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.find = async (req, res) => {
            let idFood = req.params.idFood;
            let foods = await foodService_1.default.findById(idFood);
            return res.status(201).json(foods);
        };
        this.destroy = async (req, res) => {
            let idFood = req.params.idFood;
            let food = await foodService_1.default.deleteFood(idFood);
            return res.status(200).json(food);
        };
        this.update = async (req, res) => {
            let idFood = req.params.idFood;
            let newFood = req.body;
            await this.foodService.update(idFood, newFood);
            res.status(200).json('Success!');
        };
        this.findFoodByName = async (req, res) => {
            try {
                let nameFood = req.body;
                let foods = await foodService_1.default.findFoodByNameFood(nameFood.nameFood);
                return res.status(200).json(foods);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.foodService = foodService_1.default;
    }
}
exports.default = new FoodController();
//# sourceMappingURL=foodController.js.map