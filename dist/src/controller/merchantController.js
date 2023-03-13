"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merchantService_1 = __importDefault(require("../service/merchantService"));
class MerchantController {
    constructor() {
        this.register = async (req, res) => {
            try {
                let merchant = await this.merchantService.register(req.body);
                return res.status(201).json(merchant);
            }
            catch (e) {
                console.log(e.message);
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let response = await this.merchantService.checkMerchant(req.body);
                if (response === "Merchant not found" || response === "Wrong password" || response === "Account not ready" || response === "Account locked") {
                    console.log(response);
                    return res.status(200).json(response);
                }
                else {
                    return res.status(200).json(Object.assign({}, response));
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.merchantService = merchantService_1.default;
    }
}
exports.default = new MerchantController();
//# sourceMappingURL=merchantController.js.map