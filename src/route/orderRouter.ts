import {Router} from "express";
import orderController from "../controller/OrderController";

export const orderRouter = Router();
orderRouter.get('/getOrder/:idMerchant', orderController.getOrder);
orderRouter.get('/countCart/:idOrder', orderController.countCart);
orderRouter.post('/addCart', orderController.addCart);
orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.put('/editOrder/:idOrder', orderController.editOrder);
orderRouter.get('/find-by-status/:idUser', orderController.findByStatus);
orderRouter.get('/find-by-idUser/:idUser', orderController.findById);
orderRouter.get('/find-by-idOrder/:idOrder', orderController.findByIdOrder);
orderRouter.get('/show-cart/:idOrder', orderController.showCart);
orderRouter.delete('/delete-cart/:idOrder', orderController.deleteCart);
orderRouter.put('/statusConfirm/:idOrder',orderController.setStatusConfirm);
orderRouter.put('/statusCancelled/:idOrder',orderController.setStatusCancelled)
orderRouter.put('/statusSuccess/:idOrder',orderController.setStatusSuccess)
orderRouter.get('/my-order-food/:idOrder', orderController.myOrderFood);
orderRouter.get('/my-order/:idUser', orderController.myOrder);
orderRouter.get('/orderDetail/:idOrder', orderController.orderDetail);
orderRouter.post('/find-by-order',orderController.findByOrder);