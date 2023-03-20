import {Router} from "express";
import orderController from "../controller/OrderController";

export const orderRouter = Router();
orderRouter.get('/getOrder', orderController.getOrder);
orderRouter.get('/countCart/:idOrder', orderController.countCart);
orderRouter.post('/addCart', orderController.addCart);
orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.put('/editOrder/:idOrder', orderController.editOrder);
orderRouter.get('/find-by-status/:idUser', orderController.findByStatus);
orderRouter.get('/find-by-idUser/:idUser', orderController.findById);
orderRouter.get('/show-cart/:idOrder', orderController.showCart);
orderRouter.delete('/delete-cart/:idOrder', orderController.deleteCart);
orderRouter.get('/my-order-food/:idUser/:idOrder', orderController.myOrderFood);
orderRouter.get('/my-order/:idUser', orderController.myOrder);