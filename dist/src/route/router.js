"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const foodRouter_1 = require("./foodRouter");
const userRouter_1 = require("./userRouter");
const merchantRouter_1 = require("./merchantRouter");
const adminRouter_1 = require("./adminRouter");
const categoryRouter_1 = require("./categoryRouter");
const orderRouter_1 = require("./orderRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/foods', foodRouter_1.foodRouter);
exports.router.use('/users', userRouter_1.userRouter);
exports.router.use('/merchants', merchantRouter_1.merchantRouter);
exports.router.use('/admin', adminRouter_1.adminRouter);
exports.router.use('/categories', categoryRouter_1.categoryRouter);
exports.router.use('/orders', orderRouter_1.orderRouter);
//# sourceMappingURL=router.js.map