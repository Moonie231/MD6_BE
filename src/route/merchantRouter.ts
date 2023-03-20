import {Router} from "express";
import MerchantController from "../controller/merchantController";

export const merchantRouter = Router()
merchantRouter.post('/register', MerchantController.register)
merchantRouter.post('/login', MerchantController.login)
merchantRouter.get('/statistics-by-user/:id', MerchantController.statisticsByUser)
merchantRouter.get('/statistics-by-status/:id', MerchantController.statisticsByStatus)
merchantRouter.get('/statistics-by-food/:id', MerchantController.statisticsByFood)
merchantRouter.get('/statistics-by-week/:id', MerchantController.statisticsByWeek)
merchantRouter.get('/statistics-by-month/:id', MerchantController.statisticsByMonth)
merchantRouter.get('/statistics-by-year/:id', MerchantController.statisticsByYear)
merchantRouter.put('/:idMerchant', MerchantController.editMerchant)
merchantRouter.get('/my-profile/:idMerchant', MerchantController.showMyProfile)
