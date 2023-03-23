"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Notification_1 = require("../model/Notification");
class CategoryService {
    constructor() {
        this.getNotificationOfMerchant = async (idMerchant) => {
            let sql = `SELECT n.setStatus, o.totalMoney, u.email, o.idOrder
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}
                     and n.setStatus!='delivery'
                   group by n.setStatus
                   ORDER BY n.idNotification DESC`;
            let notifications = await this.notificationRepository.query(sql);
            return notifications;
        };
        this.getNotificationOfUser = async (idUser) => {
            let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser} and n.setStatus!='pending'
                   group by n.setStatus
                   ORDER BY n.idNotification DESC`;
            let notifications = await this.notificationRepository.query(sql);
            return notifications;
        };
        this.saveNotification = async (info) => {
            return await this.notificationRepository.save(info);
        };
        this.countMerchant = async (idMerchant) => {
            let sql = `SELECT COUNT(DISTINCT n.idNotification) as count
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}
                     and n.setStatus!='delivery' and n.seenMerchant=false
                   group by n.setStatus`;
            let notifications = await this.notificationRepository.query(sql);
            return notifications;
        };
        this.countUser = async (idUser) => {
            let sql = `SELECT COUNT(DISTINCT n.idNotification) as count
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser}
                     and n.setStatus!='pending' and n.seenUser=false
                   group by n.setStatus`;
            let notifications = await this.notificationRepository.query(sql);
            return notifications;
        };
        this.updateSeenUsers = async (idUser) => {
            let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder,n.idNotification
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser}  and n.setStatus!='pending' and n.seenUser=false
                   group by n.setStatus `;
            let seen = await this.notificationRepository.query(sql);
            for (let i = 0; i < seen.length; i++) {
                await this.updateSeenUser(seen[i].idNotification);
            }
            return seen;
        };
        this.updateSeenMerchants = async (idMerchant) => {
            let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder,n.idNotification
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}  and n.setStatus!='delivery'
                   and n.seenMerchant=false
                   group by n.setStatus `;
            let seen = await this.notificationRepository.query(sql);
            for (let i = 0; i < seen.length; i++) {
                await this.updateSeenMerchant(seen[i].idNotification);
            }
            return seen;
        };
        this.updateSeenUser = async (idNotification) => {
            let data = {
                seenUser: true
            };
            return await this.notificationRepository.update({ idNotification: idNotification }, data);
        };
        this.updateSeenMerchant = async (idNotification) => {
            let data = {
                seenMerchant: true
            };
            return await this.notificationRepository.update({ idNotification: idNotification }, data);
        };
        this.notificationRepository = data_source_1.AppDataSource.getRepository(Notification_1.Notification);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=notificationService.js.map