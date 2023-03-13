"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Food_1 = require("../model/Food");
class FoodService {
    constructor() {
        this.getAll = async () => {
            let sql = `select * from food f join category c on f.idCategory = c.idCategory`;
            let foods = await this.FoodRepository.query(sql);
            if (foods) {
                return "No homes found";
            }
            return foods;
        };
        this.getAllFood = async () => {
            let sql = `select * from food f join merchant m on f.id_Merchant = m.idMerchant join category c on f.id_Category = c.idCategory `;
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
            return { homes: foods };
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
            let foods = await this.FoodRepository.findOneBy({ idFood: idFood });
            return foods;
        };
        this.findFoodByNameFood = async (value) => {
            let sql = `select * from food f join category c on f.id_Category = c.idCategory where f.nameFood like '%${value}%'`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return null;
            }
            return { foods: foods };
        };
        this.FoodRepository = data_source_1.AppDataSource.getRepository(Food_1.Food);
    }
}
exports.default = new FoodService();
//# sourceMappingURL=foodService.js.map