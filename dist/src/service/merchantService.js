"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Merchant_1 = require("../model/Merchant");
const Order_1 = require("../model/Order");
class MerchantServices {
    constructor() {
        this.register = async (merchant) => {
            let userCheck = await this.merchantRepository.findOneBy({ email: merchant.email });
            if (userCheck) {
                return "Email already registered";
            }
            merchant.merchantPassword = await bcrypt_1.default.hash(merchant.merchantPassword, 10);
            return this.merchantRepository.save(merchant);
        };
        this.checkMerchant = async (merchant) => {
            let merchantCheck = await this.merchantRepository.findOneBy({ email: merchant.email });
            if (!merchantCheck) {
                return "Merchant not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(merchant.merchantPassword, merchantCheck.merchantPassword);
                if (!passwordCompare) {
                    return "Wrong password";
                }
                else {
                    if (merchantCheck.status === 'pending approval') {
                        return "Account not ready";
                    }
                    if (merchantCheck.status === 'locked') {
                        return "Account locked";
                    }
                    let payload = {
                        idMerchant: merchantCheck.idUser,
                        nameMerchant: merchantCheck.nameMerchant
                    };
                    const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000000
                    });
                    let merchantRes = {
                        idMerchant: merchantCheck.idMerchant,
                        nameMerchant: merchantCheck.nameMerchant,
                        image: merchantCheck.image,
                        token: token
                    };
                    return merchantRes;
                }
            }
        };
        this.getMyProfile = async (idMerchant) => {
            let merchant = await this.merchantRepository.findOneBy({ idMerchant: idMerchant });
            return merchant;
        };
        this.edit = async (id, newMerchant) => {
            let checkMerchant = await this.merchantRepository.findOneBy({ idMerchant: id });
            if (!checkMerchant) {
                return "Merchant not found";
            }
            return await this.merchantRepository.update({ idMerchant: id }, newMerchant);
        };
        this.getMerchantActive = async () => {
            let sql = 'select * from merchant where status = "active" or status = "locked"';
            let merchants = await this.merchantRepository.query(sql);
            return merchants;
        };
        this.getMerchantPending = async () => {
            let sql = 'select * from merchant where status = "pending approval"';
            let merchants = await this.merchantRepository.query(sql);
            return merchants;
        };
        this.getMerchant = async (idMerchant) => {
            let merchant = await this.merchantRepository.findOneBy({ idMerchant: idMerchant });
            return merchant;
        };
        this.setStatus = async (id) => {
            let checkMerchant = await this.merchantRepository.findOneBy({ idMerchant: id });
            if (!checkMerchant) {
                return "Merchant not found";
            }
            if (checkMerchant.status === "locked" || checkMerchant.status === "pending approval") {
                return await this.merchantRepository.update({ idMerchant: id }, { status: "active" });
            }
            else {
                return await this.merchantRepository.update({ idMerchant: id }, { status: "locked" });
            }
        };
        this.statisticsByStatus = async (id) => {
            let sql = `SELECT o.status, SUM(od.price) as totalMoney
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where m.idMerchant = ${id}
                   group by o.status  `;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.statisticsByDay = async (month, id) => {
            console.log(month);
            let sql = `SELECT CONCAT('Week ', FLOOR((DAY(o.Date)) / 7) + 1) AS week, DAY (o.Date),
                       SUM (od.price) AS totalMoney
                   FROM merchant m
                       INNER JOIN food f
                   ON m.idMerchant = f.id_Merchant
                       INNER JOIN order_detail od ON f.idFood = od.id_Food
                       INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                       INNER JOIN user u ON o.id_user = u.idUser
                   WHERE m.idMerchant = ${id} and MONTH(o.Date)=${month}
                   GROUP BY week
                   ORDER BY week ASC`;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.statisticsByMonth = async (year, id) => {
            let sql = `SELECT CONCAT('Precious ', FLOOR((MONTH(o.Date)) / 3) + 1) AS month,
       SUM(od.price) AS totalMoney
                   FROM merchant m
                       INNER JOIN food f
                   ON m.idMerchant = f.id_Merchant
                       INNER JOIN order_detail od ON f.idFood = od.id_Food
                       INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                       INNER JOIN user u ON o.id_user = u.idUser 
                   WHERE m.idMerchant = ${id} and YEAR(o.Date)=${year}
                   GROUP BY month
                   ORDER BY month ASC
        `;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.statisticsByYear = async (id) => {
            let sql = `SELECT CONCAT('Year ', YEAR(o.Date)) AS year,
       SUM(od.price) AS totalMoney
                   FROM merchant m
                       INNER JOIN food f
                   ON m.idMerchant = f.id_Merchant
                       INNER JOIN order_detail od ON f.idFood = od.id_Food
                       INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                       INNER JOIN user u ON o.id_user = u.idUser
                   WHERE m.idMerchant = ${id}
                   GROUP BY year
                   ORDER BY year ASC
        `;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.statisticsByFood = async (id) => {
            let sql = `SELECT f.nameFood, SUM(od.price) as price
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where m.idMerchant = ${id}
                     and o.status = 'success'
                   group by od.id_Food
        `;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.statisticsByUser = async (id) => {
            let sql = `SELECT u.email, SUM(od.price) as totalMoney
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where m.idMerchant = ${id}
                     and o.status = 'success'
                   group by o.id_user `;
            let statistics = await this.orderRepository.query(sql);
            return statistics;
        };
        this.merchantRepository = data_source_1.AppDataSource.getRepository(Merchant_1.Merchant);
        this.orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
    }
}
exports.default = new MerchantServices();
//# sourceMappingURL=merchantService.js.map