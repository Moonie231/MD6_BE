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
        merchant.merchantPassword = await bcrypt.hash(merchant.merchantPassword, 10);
        return this.merchantRepository.save(merchant)
    }

    checkMerchant = async (merchant) => {
        let merchantCheck = await this.merchantRepository.findOneBy({email: merchant.email});
        if (!merchantCheck) {
            return "Merchant not found";
        } else {
            let passwordCompare = await bcrypt.compare(merchant.merchantPassword, merchantCheck.merchantPassword);
            if (!passwordCompare) {
                return "Wrong password"
            } else {
                if (merchantCheck.status === 'pending approval') {
                    return "Account not ready"
                }
                if (merchantCheck.status === 'locked') {
                    return "Account locked"
                }
                let payload = {
                    idMerchant: merchantCheck.idUser,
                    nameMerchant: merchantCheck.nameMerchant
                }
                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 36000000
                });
                let merchantRes = {
                    idMerchant: merchantCheck.idMerchant,
                    nameMerchant: merchantCheck.nameMerchant,
                    image: merchantCheck.image,
                    token : token
                }
                return merchantRes;
            }
        }

    }

    getMyProfile = async (idMerchant) => {
        let merchant = await this.merchantRepository.findOneBy({idMerchant: idMerchant});
        return merchant;
    }

    edit = async (id, newMerchant) => {
        console.log(newMerchant)
        let checkMerchant = await this.merchantRepository.findOneBy({idMerchant :id})
        if (!checkMerchant) {
            return "Merchant not found"
        }
        return await this.merchantRepository.update({idMerchant :id}, newMerchant)
    }

    getMerchantActive = async()  => {
        let sql = 'select * from merchant where status = "active" or status = "locked"';
        let merchants = await this.merchantRepository.query(sql);
        return merchants
    }

    getMerchantPending = async() => {
        let sql = 'select * from merchant where status = "pending approval"';
        let merchants = await this.merchantRepository.query(sql);
        return merchants
    }

    setStatus = async(id) => {
        let checkMerchant = await this.merchantRepository.findOneBy({idMerchant :id})
        if (!checkMerchant) {
            return "Merchant not found"
        }
        if (checkMerchant.status === "locked" || checkMerchant.status === "pending approval") {
            return await this.merchantRepository.update({idMerchant :id}, {status : "active"})
        }else {
            return await this.merchantRepository.update({idMerchant :id}, {status : "locked"})
        }
    }
}

export default new MerchantServices()