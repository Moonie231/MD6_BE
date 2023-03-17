"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../model/order");
const data_source_1 = require("../data-source");
const OrderDetail_1 = require("../model/OrderDetail");
class OrderService {
    constructor() {
        this.deleteCart = async (id_Order) => {
            let cart = await this.orderDetailRepository.findOneBy({ id_Order: id_Order });
            if (!cart) {
                return 'Can not remove product';
            }
            this.orderDetailRepository.delete({ id_Order: id_Order });
            return cart;
        };
        this.getOrder = async (idUser) => {
            let sql = `select o.idOrder, o.Date,o. totalMoney,o.status, u.username from order o join user u on o.id_User = u.idUser where  o.status != 'buying'`;
            let order = await this.orderRepository.query(sql);
            if (!order) {
                return 'Can not find by id order';
            }
            return order;
        };
        this.showCart = async (idOrderDetail) => {
            let sql = `select oD.idOrderdetail, f.nameFood,f.price, f.description, f.img, oD.quantity from orderDetail oD  join food f  on oD.id_Food = f.idFood where oD.id_Order = ${idOrderDetail}`;
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
            this.orderRepository.update({ idOrder: idOrder }, newOrder);
            return "Updated order";
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
            let sql = `select count(.idOrder) as countCart from orderDetail oD where oD.id_Order = ${idOrder};`;
            let countCart = await this.orderRepository.query(sql);
            if (!countCart) {
                return 'Can not countCart';
            }
            return countCart[0].countCart;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(OrderDetail_1.OrderDetail);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map