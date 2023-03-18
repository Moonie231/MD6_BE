"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const foodController_1 = __importDefault(require("../controller/foodController"));
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.get('/', foodController_1.default.findCategory);
//# sourceMappingURL=categoryRouter.js.map