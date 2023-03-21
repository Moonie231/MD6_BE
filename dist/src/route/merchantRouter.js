"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchantRouter = void 0;
const express_1 = require("express");
const merchantController_1 = __importDefault(require("../controller/merchantController"));
exports.merchantRouter = (0, express_1.Router)();
exports.merchantRouter.post('/register', merchantController_1.default.register);
exports.merchantRouter.post('/login', merchantController_1.default.login);
exports.merchantRouter.get('/statistics-by-user/:id', merchantController_1.default.statisticsByUser);
exports.merchantRouter.get('/statistics-by-status/:id', merchantController_1.default.statisticsByStatus);
exports.merchantRouter.get('/statistics-by-food/:id', merchantController_1.default.statisticsByFood);
exports.merchantRouter.get('/statistics-by-week/:id', merchantController_1.default.statisticsByWeek);
exports.merchantRouter.get('/statistics-by-month/:id', merchantController_1.default.statisticsByMonth);
exports.merchantRouter.get('/statistics-by-year/:id', merchantController_1.default.statisticsByYear);
exports.merchantRouter.put('/:idMerchant', merchantController_1.default.editMerchant);
exports.merchantRouter.get('/my-profile/:idMerchant', merchantController_1.default.showMyProfile);
//# sourceMappingURL=merchantRouter.js.map