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
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
class UserServices {
    constructor() {
        this.generateTokenFromString = (email) => {
            return email = jsonwebtoken_1.default.sign(email, process.env.JWT_SECRET_KEY);
        };
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ email: user.email });
            if (userCheck) {
                return "Email already registered";
            }
            user.userPassword = await bcrypt_1.default.hash(user.userPassword, 10);
            const tokenEmail = jsonwebtoken_1.default.sign(user.email, process.env.JWT_SECRET_KEY);
            const userNew = {
                username: user.username,
                email: user.email,
                userPassword: user.userPassword,
                tokenEmail: tokenEmail,
                status: false,
            };
            return this.userRepository.save(userNew);
        };
        this.verifyEmail = async (tokenEmail) => {
            if (!tokenEmail) {
                return " Email Token not found ...";
            }
            else {
                const user = await this.userRepository.findOneBy({ tokenEmail: tokenEmail });
                if (user) {
                    user.status = true;
                    const userInfo = {
                        status: user.status,
                        tokenEmail: null
                    };
                    return this.userRepository.update({ idUser: user.idUser }, userInfo);
                }
                else {
                    return "Email verification failed";
                }
            }
        };
        this.sendEmailVerificationRequest = async (email) => {
            const token = this.generateTokenFromString(email);
            console.log(token);
            let options = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: 'Trưa nay ăn gì WEB Email Verification',
                html: `
            <div>
                <span>Dear New User</span>
                <p>
                    Please click the following link to verify your email:
                </p>
                <a href="http://localhost:3000/verify-email/${token}">
                    http://localhost:3000/verify-email/${token}
                </a>
                <p>
                    Please ignore this email if you didn't register.
                </p>
            </div>
            `
            };
            nodemailer_config_1.default.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Message sent: ' + info.response);
                }
            });
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