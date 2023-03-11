import {Request, Response} from "express";
import MerchantService from "../service/merchantService";

class MerchantController {
    private merchantService;

    constructor() {
        this.merchantService = MerchantService;
    }

    register = async (req: Request, res: Response) => {
        try {
            let merchant = await this.merchantService.register(req.body);
            return res.status(201).json(merchant)
        } catch (e) {
            console.log(e.message)
            res.status(500).json(e.message)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            let response = await this.merchantService.checkMerchant(req.body)
            if (response=== "Merchant not found" || response=== "Wrong password" || response=== "Account not ready" || response=== "Account locked") {
                console.log(response)
                return res.status(200).json(response)
            } else {
                return res.status(200).json({...response})
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new MerchantController();