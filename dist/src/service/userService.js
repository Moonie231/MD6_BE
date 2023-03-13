"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserServices();
//# sourceMappingURL=userService.js.map