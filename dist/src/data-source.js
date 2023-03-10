"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./models/Merchant");
const User_1 = require("./models/User");
const Food_1 = require("./models/Food");
const Category_1 = require("./models/Category");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "case_md6",
    synchronize: true,
    entities: [Merchant_1.Merchant, User_1.User, Food_1.Food, Category_1.Category]
});
//# sourceMappingURL=data-source.js.map