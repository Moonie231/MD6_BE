"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notificationService_1 = __importDefault(require("../service/notificationService"));
class MerchantController {
    constructor() {
        this.getNotificationMerchant = async (req, res) => {
            try {
                let id = req.params.id;
                let notification = await this.notificationRepo.getNotificationOfMerchant(id);
                res.status(200).json(notification);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.getNotificationUser = async (req, res) => {
            try {
                let id = req.params.id;
                let notification = await this.notificationRepo.getNotificationOfUser(id);
                res.status(200).json(notification);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.countMerchant = async (req, res) => {
            try {
                let id = req.params.id;
                let countMerchant = await this.notificationRepo.countMerchant(id);
                if (countMerchant.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +countMerchant[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        this.countUser = async (req, res) => {
            try {
                let id = req.params.id;
                let countUser = await this.notificationRepo.countUser(id);
                if (countUser.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +countUser[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        this.saveNotification = async (req, res) => {
            try {
                let value = req.body;
                let notification = await this.notificationRepo.saveNotification(value);
                res.status(200).json(notification);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.updateSeenUser = async (req, res) => {
            try {
                let id = req.params.id;
                let notification = await this.notificationRepo.updateSeenUsers(id);
                res.status(200).json(notification);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.updateSeenMerchant = async (req, res) => {
            try {
                let id = req.params.id;
                let notification = await this.notificationRepo.updateSeenMerchants(id);
                res.status(200).json(notification);
            }
            catch (err) {
                console.log(err);
            }
        };
        this.notificationRepo = notificationService_1.default;
    }
}
exports.default = new MerchantController();
//# sourceMappingURL=notificationController.js.map