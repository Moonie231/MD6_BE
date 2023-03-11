"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Merchant_1 = require("../model/Merchant");
class MerchantServices {
    constructor() {
        this.register = async (merchant) => {
            let userCheck = await this.merchantRepository.findOneBy({ email: merchant.email });
            if (userCheck) {
                return "Email already registered";
            }
            merchant.merchantPassword = await bcrypt_1.default.hash(merchant.merchantPassword, 10);
            return this.merchantRepository.save(merchant);
        };
        this.checkMerchant = async (merchant) => {
            let merchantCheck = await this.merchantRepository.findOneBy({ email: merchant.email });
            if (!merchantCheck) {
                return "Merchant not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(merchant.merchantPassword, merchantCheck.merchantPassword);
                console.log(passwordCompare);
                if (!passwordCompare) {
                    return "Wrong password";
                }
                else {
                    if (merchantCheck.status === 'pending approval') {
                        return "Account not ready";
                    }
                    if (merchantCheck.status === 'locked') {
                        return "Account locked";
                    }
                    let payload = {
                        idMerchant: merchantCheck.idUser,
                        nameMerchant: merchantCheck.nameMerchant
                    };
                    const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000000
                    });
                    let merchantRes = {
                        idUser: merchantCheck.idUser,
                        nameMerchant: merchantCheck.nameMerchant,
                        image: merchantCheck.image,
                        token: token
                    };
                    return merchantRes;
                }
            }
        };
        this.merchantRepository = data_source_1.AppDataSource.getRepository(Merchant_1.Merchant);
    }
}
exports.default = new MerchantServices();
//# sourceMappingURL=merchantService.js.map