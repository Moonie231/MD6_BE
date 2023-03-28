import {AppDataSource} from "../data-source";
import {Notification} from "../model/Notification";

class CategoryService {
    private notificationRepository

    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification)
    }

    getNotificationOfMerchant = async (idMerchant) => {
        let sql = `SELECT n.setStatus, o.totalMoney, u.email, o.idOrder,n.time
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}
                     and n.setStatus!='delivery'
                   group by n.time
                   ORDER BY n.idNotification DESC`
        let notifications = await this.notificationRepository.query(sql)
        return notifications
    }
    getNotificationOfUser = async (idUser) => {
        let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder,n.time
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser} and n.setStatus!='pending'
                   group by n.time
                   ORDER BY n.idNotification DESC`
        let notifications = await this.notificationRepository.query(sql)
        return notifications
    }
    saveNotification = async (info) => {
        return await this.notificationRepository.save(info)
    }
    countMerchant = async (idMerchant) => {
        let sql = `SELECT COUNT(DISTINCT n.idNotification) as count
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}
                     and n.setStatus!='delivery' and n.seenMerchant=false
                   group by n.setStatus`

        let notifications = await this.notificationRepository.query(sql)
        return notifications
    }
    countUser = async (idUser) => {
        let sql = `SELECT COUNT(DISTINCT n.idNotification) as count
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser}
                     and n.setStatus!='pending' and n.seenUser=false
                   group by n.setStatus`

        let notifications = await this.notificationRepository.query(sql)
        return notifications
    }
    updateSeenUsers = async (idUser) => {
        let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder,n.idNotification
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where u.idUser = ${idUser}  and n.setStatus!='pending' and n.seenUser=false
                   group by n.setStatus `
        let seen=await this.notificationRepository.query(sql)
        for (let i=0; i<seen.length; i++){
           await this.updateSeenUser(seen[i].idNotification)
        }
        return seen
    }
    updateSeenMerchants = async (idMerchant) => {
        let sql = `SELECT n.setStatus, o.totalMoney, m.nameMerchant, o.idOrder,n.idNotification
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN notification n ON o.idOrder = n.id_Order
                            INNER JOIN user u ON n.id_User = u.idUser
                   where m.idMerchant = ${idMerchant}  and n.setStatus!='delivery'
                   and n.seenMerchant=false
                   group by n.setStatus `
        let seen=await this.notificationRepository.query(sql)
        for (let i=0; i<seen.length; i++){
           await this.updateSeenMerchant(seen[i].idNotification)
        }
        return seen
    }
    updateSeenUser=async (idNotification)=>{
        let data={
            seenUser:true
        }
        return await this.notificationRepository.update({idNotification:idNotification},data)
    }
    updateSeenMerchant=async (idNotification)=>{
        let data={
            seenMerchant:true
        }
        return await this.notificationRepository.update({idNotification:idNotification},data)
    }
}

export default new CategoryService();