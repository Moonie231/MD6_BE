"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const merchantController_1 = __importDefault(require("../controller/merchantController"));
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.get('/', merchantController_1.default.getMerchantActive);
exports.adminRouter.get('/pending', merchantController_1.default.getMerchantPending);
exports.adminRouter.put('/lock/:idMerchant', merchantController_1.default.lockMerchant);
//# sourceMappingURL=adminRouter.js.map