"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Food_1 = require("../model/Food");
const Order_1 = require("../model/Order");
class FoodService {
    constructor() {
        this.getAll = async (limit, offset) => {
            let sql = `select *
                   from food f
                            join merchant m on f.id_Merchant = m.idMerchant
                            join category c on f.id_Category = c.idCategory limit ${limit}
                   offset ${offset}`;
            let foods = await this.FoodRepository.query(sql);
            return foods;
        };
        this.count = async () => {
            let sql = `select count(idFood)
                   from food `;
            let count = await this.FoodRepository.query(sql);
            return count;
        };
        this.getAllFood = async () => {
            let sql = `select *
                   from food f
                            join merchant m on f.id_Merchant = m.idMerchant
                            join category c on f.id_Category = c.idCategory limit 8`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return "No foods found";
            }
            return foods;
        };
        this.getMyFood = async (idMerchant) => {
            let sql = `select *
                   from food f
                            join category c on f.id_Category = c.idCategory
                            join merchant m on f.id_Merchant = m.idMerchant
                   where m.idMerchant = ${idMerchant}`;
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
            let sql = `select *
                   from food
                            join category on food.id_Category = category.idCategory
                   where food.idFood = ${idFood}`;
            let food = await this.FoodRepository.query(sql);
            return food[0];
        };
        this.findFoodByNameFood = async (value) => {
            let sql = `select *
                   from food f
                            join category c on f.id_Category = c.idCategory
                            join merchant m on f.id_Merchant = m.idMerchant
                   where f.nameFood like '%${value}%' limit 8`;
            let foods = await this.FoodRepository.query(sql);
            if (!foods) {
                return null;
            }
            return foods;
        };
        this.updateOneQuantity = async (id, value) => {
            let quantity = {
                quantityFood: value
            };
            return this.FoodRepository.update({ idFood: id }, quantity);
        };
        this.updateQuantity = async (idOrder) => {
            let sql = `SELECT od.idOrderDetail,f.idFood,f.quantityFood,SUM(od.quantity) as quantity,f.idFood
                   FROM food f
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                   where o.idOrder = ${idOrder} group by f.idFood`;
            let order = await this.orderRepository.query(sql);
            let quantity = 0;
            for (let i = 0; i < order.length; i++) {
                console.log(order[i]);
                quantity = order[i].quantityFood - order[i].quantity;
                await this.updateOneQuantity(order[i].idFood, quantity);
            }
            return order;
        };
        this.FoodRepository = data_source_1.AppDataSource.getRepository(Food_1.Food);
        this.orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
    }
}
exports.default = new FoodService();
//# sourceMappingURL=foodService.js.map