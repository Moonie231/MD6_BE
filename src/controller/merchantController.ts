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

    getMerchant = async (req: Request, res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let merchant = await this.merchantService.getMerchant(idMerchant)
            return res.status(200).json(merchant)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    setStatus = async (req, res) => {
        try {
            let merchant = await this.merchantService.setStatus(req.params.idMerchant)
            return res.status(201).json(merchant)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByStatus=async (req, res) => {
        try {
            let status=req.body.status
            let id=req.params.id
            let statistics=await this.merchantService.statisticsByStatus(id,status)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByFood=async (req, res) => {
        try {
            let id=req.params.id
            let statistics=await this.merchantService.statisticsByFood(id)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByUser=async (req, res) => {
        try {
            let id=req.params.id
            let statistics=await this.merchantService.statisticsByUser(id)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByWeek=async (req, res) => {
        try {
            let month=req.query.month
            let id=req.params.id
            let statistics=await this.merchantService.statisticsByDay(month,id)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByMonth=async (req, res) => {
        try {
            let id=req.params.id
            let year=req.query.year
            let statistics=await this.merchantService.statisticsByMonth(year,id)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }
    statisticsByYear=async (req, res) => {
        try {
            let id=req.params.id
            let statistics=await this.merchantService.statisticsByYear(id)
            return res.status(201).json(statistics)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }

}

export default new MerchantController();