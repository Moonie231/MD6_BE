"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const foodRouter_1 = require("./foodRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/foods', foodRouter_1.foodRouter);
//# sourceMappingURL=router.js.map