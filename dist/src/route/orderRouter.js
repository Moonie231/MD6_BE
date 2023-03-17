"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const OrderController_1 = __importDefault(require("../controller/OrderController"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get('/getOrder', OrderController_1.default.getOrder);
exports.orderRouter.get('/countCart/:idOrder', OrderController_1.default.countCart);
exports.orderRouter.post('/addCart', OrderController_1.default.addCart);
exports.orderRouter.post('/addOrder', OrderController_1.default.addOrder);
exports.orderRouter.put('/editOrder/:id', OrderController_1.default.editOrder);
exports.orderRouter.get('/find-by-status/:idUser', OrderController_1.default.findByStatus);
exports.orderRouter.get('/find-by-idUser/:idUser', OrderController_1.default.findById);
exports.orderRouter.get('/show-cart/:idOrder', OrderController_1.default.showCart);
exports.orderRouter.delete('/delete-cart/:id', OrderController_1.default.deleteCart);
//# sourceMappingURL=orderRouter.js.map