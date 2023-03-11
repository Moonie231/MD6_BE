import {Request, Response} from "express";
import UserService from "../service/userService";

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

    login = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkUser(req.body)
            if (response=== "User not found" || response=== "Wrong password" || response=== "Account not ready" || response=== "Account locked") {
                return res.status(200).json(response)
            } else {
                return res.status(200).json({...response})
            }
        } catch (e) {
            console.log(e.message)
            res.status(500).json(e.message)
        }
    }
}

export default new UserController();