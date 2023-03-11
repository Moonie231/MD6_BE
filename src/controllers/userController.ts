import {Request, Response} from "express";
import UserService from "../services/userService";

class UserController {
    private userServices;

    constructor() {
        this.userServices = UserService;
    }

    register = async (req: Request, res: Response) => {
        try {
            let user = await this.userServices.register(req.body);
            return res.status(201).json(user)
        } catch (e) {
            console.log(e.message)
            res.status(500).json(e.message)
        }
    }
}

export default new UserController();