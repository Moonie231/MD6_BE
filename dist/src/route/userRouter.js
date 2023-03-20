"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const userController_2 = __importDefault(require("../controller/userController"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', userController_1.default.register);
exports.userRouter.post('/login', userController_1.default.login);
exports.userRouter.post('/verify-email', userController_1.default.verifyEmailUser);
exports.userRouter.put('/:idUser', userController_1.default.editUser);
exports.userRouter.get('/my-profile/:idUser', userController_2.default.showMyProfile);
exports.userRouter.get('/address/:idUser', userController_2.default.address);
exports.userRouter.post('/address/add', userController_2.default.addAddress);
exports.userRouter.put('/address/edit/:idAddress', userController_2.default.editAddress);
exports.userRouter.delete('/address/delete/:idAddress', userController_2.default.deleteAddress);
//# sourceMappingURL=userRouter.js.map