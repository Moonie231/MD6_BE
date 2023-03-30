import {Router} from "express";
import NotificationController from "../controller/notificationController";

export const notification = Router()
notification.get('/merchants/:id', NotificationController.getNotificationMerchant)
notification.get('/user/:id', NotificationController.getNotificationUser)
notification.put('/user-seen/:id', NotificationController.updateSeenUser)
notification.put('/merchant-seen/:id', NotificationController.updateSeenMerchant)
notification.get('/count-merchant/:id', NotificationController.countMerchant)
notification.get('/count-user/:id', NotificationController.countUser)
notification.post('/', NotificationController.saveNotification)