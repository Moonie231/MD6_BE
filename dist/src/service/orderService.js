"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../model/Order");
const data_source_1 = require("../data-source");
const OrderDetail_1 = require("../model/OrderDetail");
class OrderService {
    constructor() {
        this.removeCart = async (idOrder) => {
            let cart = await this.orderDetailRepository.findOneBy({ idOrderDetail: idOrder });
            if (!cart) {
                return 'Can not remove order';
            }
            return this.orderDetailRepository.delete({ idOrderDetail: idOrder });
        };
        this.getOrder = async (idMerchant) => {
            let sql = `SELECT o.*, u.username
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            inner join category c on f.id_Category = c.idCategory
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where m.idMerchant = ${idMerchant} and o.status != 'watching'
                   group by o.idOrder`;
            let order = await this.orderRepository.query(sql);
            return order;
        };
        this.setStatusConfirm = async (idOrder) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!checkOrder) {
                return "Order not found";
            }
            if (checkOrder.status === "pending") {
                return await this.orderRepository.update({ idOrder: idOrder }, { status: "delivery" });
            }
        };
        this.setStatusCancelled = async (idOrder) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!checkOrder) {
                return "Order not found";
            }
            if (checkOrder.status === "pending") {
                return await this.orderRepository.update({ idOrder: idOrder }, { status: "cancelled" });
            }
        };
        this.setStatusSuccess = async (idOrder) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!checkOrder) {
                return "Order not found";
            }
            if (checkOrder.status === "delivery") {
                return await this.orderRepository.update({ idOrder: idOrder }, { status: "success" });
            }
        };
        this.showCart = async (idOrder) => {
            let sql = `select o_d.idOrderdetail,
                          f.nameFood,
                          f.id_Merchant,
                          f.img,
                          o_d.id_Food,
                          SUM(o_d.quantity) as quantity,
                          SUM(o_d.price)    as price
                   from order_detail o_d
                            join food f on o_d.id_Food = f.idFood
                   where o_d.id_Order = ${idOrder}
                   group by o_d.id_Food`;
            let cart = this.orderRepository.query(sql);
            if (!cart) {
                return 'Can not find cart';
            }
            return cart;
        };
        this.save = async (value) => {
            let order = this.orderRepository.save(value);
            if (!order) {
                return 'Can not save order';
            }
            return order;
        };
        this.updateOrder = async (idOrder, newOrder) => {
            let order = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!order) {
                return 'Can not update order';
            }
            else {
                let orderInfo = {
                    id_user: newOrder.id_user,
                    totalMoney: newOrder.totalMoney,
                    id_Address: newOrder.id_Address,
                    Date: new Date().toISOString(),
                    status: 'pending'
                };
                let data = {
                    id_user: newOrder.id_user,
                    status: 'watching'
                };
                await this.orderRepository.update({ idOrder: idOrder }, orderInfo);
                return await this.orderRepository.save(data);
            }
        };
        this.findById = async (idUser) => {
            let sql = `select *
                   from order o
                   where o.id_User = ${idUser}
                     and o.status != 'buying'`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by id order';
            }
            return order;
        };
        this.findByIdOrder = async (idOrder) => {
            let sql = `select *
                   from order_detail
                            join food f on order_detail.id_Food = f.idFood
                            join \`order\` on order_detail.id_Order = \`order\`.idOrder
                   where \`order\`.idOrder = ${idOrder}`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by id order';
            }
            return order;
        };
        this.findByStatusOrder = async (idUser) => {
            let sql = `select *
                   from order o
                   where o.id_User = ${idUser}
                     and o.status = 'buying';`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by status order';
            }
            return order;
        };
        this.saveCart = async (values) => {
            let cart = this.orderDetailRepository.save(values);
            if (!cart) {
                return 'Can not save cart';
            }
            return 'Saved cart';
        };
        this.countCart = async (idOrder) => {
            let sql = `select count(o_d.idOrderDetail) as countCart
                   from order_detail o_d
                   where o_d.id_Order = ${idOrder};`;
            let countCart = await this.orderRepository.query(sql);
            if (!countCart) {
                return 'Can not countCart';
            }
            return +countCart[0].countCart;
        };
        this.myOrderFood = async (idOder) => {
            let sql = `SELECT f.nameFood,
                          f.img,
                          c.nameCategory,
                          SUM(od.quantity) as quantity,
                          SUM(od.price)    as price,
                          o.totalMoney,
                          o.status,
                          m.nameMerchant
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            inner join category c on f.id_Category = c.idCategory
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where o.idOrder = ${idOder}
                   group by f.idFood `;
            let food = await this.orderRepository.query(sql);
            return food;
        };
        this.myOrder = async (idUser, limit, offset) => {
            let sql = `SELECT o.*, m.nameMerchant
                   FROM merchant m
                            INNER JOIN food f ON m.idMerchant = f.id_Merchant
                            inner join category c on f.id_Category = c.idCategory
                            INNER JOIN order_detail od ON f.idFood = od.id_Food
                            INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                            INNER JOIN user u ON o.id_user = u.idUser
                   where u.idUser = ${idUser} and o.status != 'watching'
                   group by o.idOrder limit ${limit} offset ${offset}`;
            let order = await this.orderRepository.query(sql);
            return order;
        };
        this.countOrderUser = async (idUser) => {
            let sql = `select count(idOrder)
                   from \`order\` where id_user = ${idUser} and status != 'watching'`;
            let count = await this.orderRepository.query(sql);
            return count;
        };
        this.orderDetail = async (idOder) => {
            let sql = `select \`order\`.*, user.username, user.phone, address.nameAddress
                   from \`order\`
                            join user on \`order\`.id_user = user.idUser
                            join address on \`order\`.id_Address = address.idAddress
                   where \`order\`.idOrder = ${idOder}
                     and \`order\`.status != 'watching' `;
            let order = await this.orderRepository.query(sql);
            return order[0];
        };
        this.findByOrder = async (value, idMerchant) => {
            let sql = `select u.username,
                          o.idOrder,
                          f.nameFood,
                          f.img,
                          c.nameCategory,
                          o_d.quantity,
                          o_d.price,
                          o.status,
                          u.phone
                   from order_detail o_d
                            join \`order\` o on o_d.id_Order = o.idOrder
                            join user u on o.id_User = u.idUser
                            join food f on o_d.id_Food = f.idFood
                            join category c on f.id_Category = c.idCategory
                            join merchant m on f.id_Merchant = m.idMerchant
                   where u.phone like '%${value}%'
                      or u.username like '%${value}%'
                      or o.idOrder like '%${value}%' and m.idMerchant = ${idMerchant}
                      group by o.idOrder`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return null;
            }
            return order;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(OrderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map