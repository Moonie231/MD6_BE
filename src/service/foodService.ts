
import { AppDataSource } from "../data-source";
import {Food} from "../models/Food";
class FoodService {
    private FoodRepository;
    constructor() {
        this.FoodRepository = AppDataSource.getRepository(Food)
    }
    getAll = async () => {
        let sql = `select * from food f join category c on f.idCategory = c.idCategory`;
        let foods = await this.FoodRepository.query(sql);
        if (foods) {
            return "No homes found";
        }
        return foods;
    };
    getAllFood = async () => {
        let sql = `select * from food f join merchant m on f.id_Merchant = m.idMerchant join category c on f.id_Category = c.idCategory `;
        let foods = await this.FoodRepository.query(sql);
        if (!foods) {
            return "No foods found";
        }
        return foods;
    };
    getMyFood = async (idMerchant) => {
        let sql = `select * from food f join category c on f.id_Category = c.idCategory join merchant m on f.id_Merchant = m.idMerchant where m.idMerchant = ${idMerchant}`;
        let foods = await this.FoodRepository.query(sql);
        if (!foods) {
            return null;
        }
        return {homes: foods};
    };
    save = async (food) => {
        return this.FoodRepository.save(food);
    };
    updateFood = async (idFood, newFood) => {
        let foods = await this.FoodRepository.findOneBy({ idFood: idFood });
        if (!foods) {
            return null;
        }
        newFood.count = foods.count;
        return this.FoodRepository.update({ idFood: idFood }, newFood);
    };
    deleteFood= async (idFood) => {
        let foods = await this.FoodRepository.findOneBy({ idFood: idFood });
        if (!foods) {
            return null;
        }
        return this.FoodRepository.delete({ idFood: idFood });
    };
    findById = async (idFood) => {
        let foods = await this.FoodRepository.findOneBy({ idFood: idFood });
        return foods;
    };
    findFoodByNameFood = async (value) => {
        let sql = `select * from food f join category c on f.id_Category = c.idCategory where f.nameFood like '%${value}%'`;
        let foods = await this.FoodRepository.query(sql);
        if (!foods) {
            return null;
        }
        return {foods: foods};
    };
}



export default new FoodService();