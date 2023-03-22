"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRouter = void 0;
const express_1 = require("express");
const foodController_1 = __importDefault(require("../controller/foodController"));
exports.foodRouter = (0, express_1.Router)();
exports.foodRouter.get("/merchants", foodController_1.default.getAllFood);
exports.foodRouter.get("/", foodController_1.default.getAll);
exports.foodRouter.post('/find-by-nameFood', foodController_1.default.findFoodByName);
exports.foodRouter.get("/my-foods/:idMerchant", foodController_1.default.getMyFood);
exports.foodRouter.post("", foodController_1.default.createFood);
exports.foodRouter.put("/:idFood", foodController_1.default.update);
exports.foodRouter.delete("/:idFood", foodController_1.default.destroy);
exports.foodRouter.get("/find-by-id/:idFood", foodController_1.default.find);
exports.foodRouter.put("/quantity/:id", foodController_1.default.updateQuantity);
//# sourceMappingURL=foodRouter.js.map