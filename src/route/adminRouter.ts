import {Router} from "express";
import MerchantController from "../controller/merchantController";

export const adminRouter = Router()
adminRouter.get('/', MerchantController.getMerchantActive)
adminRouter.get('/pending', MerchantController.getMerchantPending)
adminRouter.put('/lock/:idMerchant', MerchantController.lockMerchant)