import {Router} from "express";
import MerchantController from "../controller/merchantController";

export const adminRouter = Router()
adminRouter.get('/', MerchantController.getMerchantActive)
adminRouter.get('/pending', MerchantController.getMerchantPending)
adminRouter.put('/status/:idMerchant', MerchantController.setStatus)
adminRouter.get('/merchant/:idMerchant', MerchantController.getMerchant)