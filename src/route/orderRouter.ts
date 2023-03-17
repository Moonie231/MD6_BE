import {Router} from "express";
import orderController from "../controller/OrderController";

export const orderRouter = Router();
orderRouter.get('/getOrder', orderController.getOrder);
orderRouter.get('/countCart/:idOrder', orderController.countCart);
orderRouter.post('/addCart', orderController.addCart);
orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.put('/editOrder/:id', orderController.editOrder);
orderRouter.get('/find-by-status/:idUser', orderController.findByStatus);
orderRouter.get('/find-by-idUser/:idUser', orderController.findById);
orderRouter.get('/show-cart/:idOrder', orderController.showCart);
orderRouter.delete('/delete-cart/:id', orderController.deleteCart);