import {Router} from "express";
import MerchantController from "../controller/merchantController";

export const merchantRouter = Router()
merchantRouter.post('/register', MerchantController.register)
merchantRouter.post('/login', MerchantController.login)
merchantRouter.put('/edit/:idMerchant', MerchantController.editMerchant)