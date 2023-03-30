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
orderRouter.get('/find-by-order/:idMerchant?',orderController.findByOrder);
orderRouter.get('/find-by-order-pending/:idMerchant',orderController.findByOrderPending);
orderRouter.get('/find-by-order-cancelled/:idMerchant',orderController.findByOrderCancelled);
orderRouter.get('/find-by-order-success/:idMerchant',orderController.findByOrderSuccess);
orderRouter.get('/find-by-order-delivery/:idMerchant',orderController.findByOrderDelivery);
orderRouter.get('/count-order-pending/:idMerchant', orderController.findByOrderCountPending);
orderRouter.get('/count-order-cancelled/:idMerchant', orderController.findByOrderCountCancelled);
orderRouter.get('/count-order-success/:idMerchant', orderController.findByOrderCountSuccess);
orderRouter.get('/count-order-delivery/:idMerchant', orderController.findByOrderCountDelivery);
