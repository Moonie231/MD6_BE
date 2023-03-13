"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const foodRouter_1 = require("./foodRouter");
const userRouter_1 = require("./userRouter");
const merchantRouter_1 = require("./merchantRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/foods', foodRouter_1.foodRouter);
exports.router.use('/users', userRouter_1.userRouter);
exports.router.use('/merchants', merchantRouter_1.merchantRouter);
//# sourceMappingURL=router.js.map