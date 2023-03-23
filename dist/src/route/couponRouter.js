"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const express_1 = require("express");
const couponCotroller_1 = __importDefault(require("../controller/couponCotroller"));
exports.couponRouter = (0, express_1.Router)();
exports.couponRouter.post('', couponCotroller_1.default.addCoupon);
exports.couponRouter.get('', couponCotroller_1.default.allCoupon);
exports.couponRouter.get('/:idMerchant', couponCotroller_1.default.myCoupon);
exports.couponRouter.get('/:idCoupon', couponCotroller_1.default.getCoupon);
exports.couponRouter.put('/:idCoupon', couponCotroller_1.default.editCoupon);
exports.couponRouter.delete('/:idCoupon', couponCotroller_1.default.deleteCoupon);
//# sourceMappingURL=couponRouter.js.map