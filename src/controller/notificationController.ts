import {Request, Response} from "express";
import NotificationService from "../service/notificationService";

class MerchantController {
    private notificationRepo;

    constructor() {
        this.notificationRepo = NotificationService;
    }

    getNotificationMerchant = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let notification = await this.notificationRepo.getNotificationOfMerchant(id)
            res.status(200).json(notification);
        } catch (err) {
            console.log(err)
        }
    }
    getNotificationUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let notification = await this.notificationRepo.getNotificationOfUser(id)
            res.status(200).json(notification);
        } catch (err) {
            console.log(err)
        }
    }
    countMerchant = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let countMerchant = await this.notificationRepo.countMerchant(id)
            if (countMerchant.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +countMerchant[0].count
                return res.status(200).json(count);
            }
        } catch (err) {
            console.log(err)
        }
    }
    countUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let countUser = await this.notificationRepo.countUser(id)
            if (countUser.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +countUser[0].count
                return res.status(200).json(count);
            }

        } catch (err) {
            console.log(err)
        }
    }
    saveNotification = async (req: Request, res: Response) => {
        try {
            let value = req.body;
            let notification = await this.notificationRepo.saveNotification(value)
            res.status(200).json(notification);
        } catch (err) {
            console.log(err)
        }
    }
    updateSeenUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let notification = await this.notificationRepo.updateSeenUsers(id)
            res.status(200).json(notification);
        } catch (err) {
            console.log(err)
        }
    }
    updateSeenMerchant = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let notification = await this.notificationRepo.updateSeenMerchants(id)
            res.status(200).json(notification);
        } catch (err) {
            console.log(err)
        }
    }
}

export default new MerchantController();