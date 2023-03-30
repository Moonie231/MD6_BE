"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = void 0;
const express_1 = require("express");
const notificationController_1 = __importDefault(require("../controller/notificationController"));
exports.notification = (0, express_1.Router)();
exports.notification.get('/merchants/:id', notificationController_1.default.getNotificationMerchant);
exports.notification.get('/user/:id', notificationController_1.default.getNotificationUser);
exports.notification.put('/user-seen/:id', notificationController_1.default.updateSeenUser);
exports.notification.put('/merchant-seen/:id', notificationController_1.default.updateSeenMerchant);
exports.notification.get('/count-merchant/:id', notificationController_1.default.countMerchant);
exports.notification.get('/count-user/:id', notificationController_1.default.countUser);
exports.notification.post('/', notificationController_1.default.saveNotification);
//# sourceMappingURL=notificationRouter.js.map