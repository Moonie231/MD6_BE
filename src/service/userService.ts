import {User} from "../model/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import {SECRET} from "../middleware/auth";
import jwt from "jsonwebtoken";

class UserServices {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)

    }

    register = async (user) => {
        let userCheck = await this.userRepository.findOneBy({email: user.email});
        if (userCheck) {
            return "Email already registered";
        }
        user.userPassword = await bcrypt.hash(user.userPassword, 10);
        return this.userRepository.save(user)
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({email: user.email});
        if (!userCheck) {
            return "User not found";
        } else {
            if (userCheck.status === 'pending approval') {
                return "Account not ready"
            }
            if (userCheck.status === 'locked') {
                return "Account locked"
            }
            let passwordCompare = await bcrypt.compare(user.userPassword, userCheck.userPassword);
            if (!passwordCompare) {
                return "Wrong password"
            } else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role
                }
                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000000
                });
                let userRes = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role,
                    avatar: userCheck.avatar,
                    token : token
                }
                return userRes;
            }
        }

    }
}

export default new UserServices()