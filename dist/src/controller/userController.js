"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
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
        this.login = async (req, res) => {
            try {
                let response = await this.userServices.checkUser(req.body);
                if (response === "User not found" || response === "Wrong password" || response === "Account not ready" || response === "Account locked") {
                    return res.status(200).json(response);
                }
                else {
                    return res.status(200).json(Object.assign({}, response));
                }
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