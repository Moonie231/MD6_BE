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
                return res.status(200).json(response)
            } else {
                return res.status(200).json({...response})
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    showMyProfile = async (req: Request, res: Response) => {
        try {
            let response = await this.merchantService.getMyProfile(req.params.idMerchant);
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    editMerchant = async (req: Request, res: Response) => {
        try {
            let merchant = await this.merchantService.edit(req.params.idMerchant, req.body);
            return res.status(201).json(merchant)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    getMerchantActive = async (req: Request, res: Response) => {
        try {
            let merchant = await this.merchantService.getMerchantActive()
            return res.status(200).json(merchant)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    getMerchantPending = async (req: Request, res:Response) => {
        try {
            let merchant = await this.merchantService.getMerchantPending()
            return res.status(200).json(merchant)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    lockMerchant = async (req, res) => {
        try {
            let merchant = await this.merchantService.lockMerchant(req.params.idMerchant)
            return res.status(201).json(merchant)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new MerchantController();