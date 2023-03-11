"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                let user = await this.userServices.register(req.body);
                return res.status(201).json(user);
            }
            catch (e) {
                console.log(e.message);
                res.status(500).json(e.message);
            }
        };
        this.userServices = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map