"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    constructor() {
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ email: user.email });
            if (userCheck) {
                return "Email already registered";
            }
            user.userPassword = await bcrypt_1.default.hash(user.userPassword, 10);
            return this.userRepository.save(user);
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ email: user.email });
            if (!userCheck) {
                return "User not found";
            }
            else {
                if (userCheck.status === 'pending approval') {
                    return "Account not ready";
                }
                if (userCheck.status === 'locked') {
                    return "Account locked";
                }
                let passwordCompare = await bcrypt_1.default.compare(user.userPassword, userCheck.userPassword);
                if (!passwordCompare) {
                    return "Wrong password";
                }
                else {
                    let payload = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role
                    };
                    const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000000
                    });
                    let userRes = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        avatar: userCheck.avatar,
                        token: token
                    };
                    return userRes;
                }
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserServices();
//# sourceMappingURL=userService.js.map