"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Merchant_1 = require("../model/Merchant");
const User_1 = require("../model/User");
const Category_1 = require("../model/Category");
const Food_1 = require("../model/Food");
require('dotenv').config();
class DataBaseConfig {
    constructor() {
        this.type = process.env.DB_CONNECTION || 'mysql';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = Number(process.env.DB_PORT) || 3306;
        this.username = process.env.DB_USER || 'root';
        this.password = process.env.DB_PASS || '123456';
        this.database = process.env.DB_NAME || 'case_md6';
        this.synchronize = false;
        this.logging = false;
        this.entities = [Merchant_1.Merchant, User_1.User, Food_1.Food, Category_1.Category];
    }
}
exports.default = DataBaseConfig;
//# sourceMappingURL=database.config.js.map