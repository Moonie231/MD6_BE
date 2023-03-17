import {Router} from "express";
import MerchantController from "../controller/merchantController";

export const merchantRouter = Router()
merchantRouter.post('/register', MerchantController.register)
merchantRouter.post('/login', MerchantController.login)
merchantRouter.post('/statistics-by-user/:id', MerchantController.statisticsByUser)
merchantRouter.post('/statistics-by-status/:id', MerchantController.statisticsByStatus)
merchantRouter.post('/statistics-by-food/:id', MerchantController.statisticsByFood)
merchantRouter.put('/:idMerchant', MerchantController.editMerchant)
merchantRouter.get('/my-profile/:idMerchant', MerchantController.showMyProfile)
