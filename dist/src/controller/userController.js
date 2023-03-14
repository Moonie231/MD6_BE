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
                await this.userServices.sendEmailVerificationRequest(req.body.email);
                return res.status(201).json(user);
            }
            catch (e) {
                console.log(e.message);
                res.status(500).json(e.message);
            }
        };
        this.verifyEmailUser = async (req, res) => {
            try {
                let verify = await this.userServices.verifyEmail(req.body.tokenEmail);
                return res.status(200).json(verify);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.login = async (req, res) => {
            try {
                console.log(req.body);
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