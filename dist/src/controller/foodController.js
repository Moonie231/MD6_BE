"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodService_1 = __importDefault(require("../service/foodService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
class FoodController {
    constructor() {
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
                let homes = await foodService_1.default.getMyFood(req["decoded"].idUser);
                return res.status(201).json({
                    homes: homes.homes,
                });
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
        this.show = async (req, res) => {
            let idFood = req.params.idFood;
            let food = await foodService_1.default.findById(idFood);
            return res.status(201).json(food);
        };
        this.destroy = async (req, res) => {
            let idFood = req.params.idFood;
            let food = await foodService_1.default.deleteFood(idFood);
            return res.status(200).json(food);
        };
        this.update = async (req, res) => {
            let idFood = req.params.idFood;
            let food = await foodService_1.default.updateFood(idFood, req.body);
            if (!food) {
                return res.status(201).json("Food Not Found");
            }
            return res.status(201).json(food);
        };
        this.findFoodByName = async (req, res) => {
            try {
                let nameFood = req.query.nameFood;
                let foods = await foodService_1.default.findFoodByNameFood(nameFood);
                return res.status(201).json({
                    foods: foods.foods,
                    nameFood: nameFood
                });
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