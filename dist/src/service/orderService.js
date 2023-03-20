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
        this.getOrder = async (idUser) => {
            let sql = `select o.idOrder, o.Date,o. totalMoney,o.status, u.username from order o join user u on o.id_User = u.idUser where  o.status != 'buying'`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by id order';
            }
            return order;
        };
        this.showCart = async (idOrder) => {
            let sql = `select o_d.idOrderdetail, f.nameFood,f.img, SUM(o_d.quantity) as quantity ,SUM(o_d.price)as price from order_detail o_d  join food f  on o_d.id_Food = f.idFood where o_d.id_Order = ${idOrder} group by o_d.id_Food`;
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
                    Date: new Date().toLocaleDateString(),
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
            let sql = `select * from order o where o.id_User = ${idUser} and  o.status != 'buying'`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by id order';
            }
            return order;
        };
        this.findByStatusOrder = async (idUser) => {
            let sql = `select * from order o where o.id_User = ${idUser} and  o.status = 'buying';`;
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
            let sql = `select count(.idOrder) as countCart from order_detail o_d where o_d.id_Order = ${idOrder};`;
            let countCart = await this.orderRepository.query(sql);
            if (!countCart) {
                return 'Can not countCart';
            }
            return countCart[0].countCart;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(Order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(OrderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map