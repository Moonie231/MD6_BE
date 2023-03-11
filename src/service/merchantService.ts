import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import {SECRET} from "../middleware/auth";
import jwt from "jsonwebtoken";
import {Merchant} from "../model/Merchant";

class MerchantServices {
    private merchantRepository;

    constructor() {
        this.merchantRepository = AppDataSource.getRepository(Merchant)

    }

    register = async (merchant) => {
        let userCheck = await this.merchantRepository.findOneBy({email: merchant.email});
        if (userCheck) {
            return "Email already registered";
        }
        merchant.userPassword = await bcrypt.hash(merchant.merchantPassword, 10);
        return this.merchantRepository.save(merchant)
    }

    checkMerchant = async (merchant) => {
        let merchantCheck = await this.merchantRepository.findOneBy({email: merchant.email});
        if (!merchantCheck) {
            return "Merchant not found";
        } else {
            if (merchantCheck.status === 'pending approval') {
                return "Account not ready"
            }
            if (merchantCheck.status === 'locked') {
                return "Account locked"
            }
            let passwordCompare = await bcrypt.compare(merchant.merchantPassword, merchantCheck.merchantPassword);
            if (!passwordCompare) {
                return "Wrong password"
            } else {
                let payload = {
                    idMerchant: merchantCheck.idUser,
                    nameMerchant: merchantCheck.nameMerchant
                }
                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000000
                });
                let merchantRes = {
                    idUser: merchantCheck.idUser,
                    nameMerchant: merchantCheck.nameMerchant,
                    image: merchantCheck.image,
                    token : token
                }
                return merchantRes;
            }
        }

    }
}

export default new MerchantServices()