"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router.use('/foods', foodRouter_1.foodRouter);
const userRouter_1 = require("./userRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/users', userRouter_1.userRouter);
//# sourceMappingURL=router.js.map