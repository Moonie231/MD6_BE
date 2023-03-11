import {User} from "../models/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';

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
}

export default new UserServices()