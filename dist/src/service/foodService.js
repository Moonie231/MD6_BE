"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Food_1 = require("../model/Food");
class FoodService {
    constructor() {
        this.getAll = async (limit, offset) => {
            let sql = `select * from food f join merchant m on f.id_Merchant = m.idMerchant join category c on f.id_Category = c.idCategory limit ${limit} offset ${offset}`;
            let foods = await this.FoodRepository.query(sql);
            return foods;
        };
        this.count = async () => {
            let sql = `select count(idFood) from food `;
            let count = await this.FoodRepository.query(sql);
            return count;
        };
        this.getAllFood = async () => {
            let sql = `select * from food f join merchant m on f.id_Merchant = m.idMerchant join category c on f.id_Category = c.idCategory limit 8`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return "No foods found";
            }
            return foods;
        };
        this.getMyFood = async (idMerchant) => {
            let sql = `select * from food f join category c on f.id_Category = c.idCategory join merchant m on f.id_Merchant = m.idMerchant where m.idMerchant = ${idMerchant}`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return null;
            }
            return foods;
        };
        this.save = async (food) => {
            return this.FoodRepository.save(food);
        };
        this.update = async (idFood, newFood) => {
            let food = await this.FoodRepository.findOneBy({ idFood: idFood });
            if (!food) {
                return null;
            }
            return this.FoodRepository.update({ idFood: idFood }, newFood);
        };
        this.deleteFood = async (idFood) => {
            let foods = await this.FoodRepository.findOneBy({ idFood: idFood });
            if (!foods) {
                return null;
            }
            return this.FoodRepository.delete({ idFood: idFood });
        };
        this.findById = async (idFood) => {
            let sql = `select * from food join category on food.id_Category = category.idCategory where food.idFood = ${idFood}`;
            let food = await this.FoodRepository.query(sql);
            return food;
        };
        this.findFoodByNameFood = async (value) => {
            let sql = `select * from food f join category c on f.id_Category = c.idCategory join merchant m on f.id_Merchant = m.idMerchant where  f.nameFood like '%${value}%' limit 8`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return null;
            }
            return foods;
        };
        this.FoodRepository = data_source_1.AppDataSource.getRepository(Food_1.Food);
    }
}
exports.default = new FoodService();
//# sourceMappingURL=foodService.js.map