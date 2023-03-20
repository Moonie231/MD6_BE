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
            await this.userServices.sendEmailVerificationRequest(req.body.email)
            return res.status(201).json(user)
        } catch (e) {
            console.log(e.message)
            res.status(500).json(e.message)
        }
    }
    verifyEmailUser=async (req, res)=> {
        try {
            let verify=await this.userServices.verifyEmail(req.body.tokenEmail);
          return res.status(200).json(verify);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
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

    showMyProfile = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.getMyProfile(req.params.idUser);
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            let user = await this.userServices.edit(req.params.idUser, req.body);
            console.log(user)
            return res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    address = async (req: Request, res: Response) =>{
        try {
            let address = await this.userServices.address(req.params.idUser)
            return res.status(201).json(address)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    addAddress = async (req: Request,res: Response) => {
        try {
            let address = await this.userServices.addAddress(req.body)
            return res.status(201).json(address)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    editAddress = async (req: Request,res: Response) =>{
        try {
            let idAddress = req.params.idAddress
            await this.userServices.editAddress(idAddress, req.body)
            return res.status(200).json('Success!')
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    deleteAddress = async (req:Request,res:Response) => {
        try {
            let idAddress = req.params.idAddress
            let address = await this.userServices.deleteAddress(idAddress)
            return res.status(200).json(address)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new UserController();