"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./model/Merchant");
const Order_1 = require("./model/Order");
const User_1 = require("./model/User");
const Food_1 = require("./model/Food");
const Category_1 = require("./model/Category");
const OrderDetail_1 = require("./model/OrderDetail");
const Address_1 = require("./model/Address");
const Coupon_1 = require("./model/Coupon");
const Notification_1 = require("./model/Notification");
const couponDetail_1 = require("./model/couponDetail");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "case_md6",
    synchronize: true,
    entities: [Merchant_1.Merchant, User_1.User, Food_1.Food, Category_1.Category, Order_1.Order, OrderDetail_1.OrderDetail, Address_1.Address, Coupon_1.Coupon, Notification_1.Notification, couponDetail_1.CouponDetail]
});
//# sourceMappingURL=data-source.js.map