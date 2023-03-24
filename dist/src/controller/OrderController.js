"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("../service/orderService"));
class OrderController {
    constructor() {
        this.deleteCart = async (req, res) => {
            let idOrder = req.params.idOrder;
            let cart = await orderService_1.default.removeCart(idOrder);
            return res.status(200).json(cart);
        };
        this.getOrder = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.getOrder(idMerchant);
                res.status(200).json(order);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.setStatusConfirm = async (req, res) => {
            try {
                let order = await this.orderService.setStatusConfirm(req.params.idOrder);
                return res.status(201).json(order);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        };
        this.setStatusCancelled = async (req, res) => {
            try {
                let order = await this.orderService.setStatusCancelled(req.params.idOrder);
                return res.status(201).json(order);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        };
        this.setStatusSuccess = async (req, res) => {
            try {
                let order = await this.orderService.setStatusSuccess(req.params.idOrder);
                return res.status(201).json(order);
            }
            catch (e) {
                return res.status(500).json(e.message);
            }
        };
        this.showCart = async (req, res) => {
            try {
                let response = await this.orderService.showCart(req.params.idOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.addCart = async (req, res) => {
            try {
                let response = await this.orderService.saveCart(req.body);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.addOrder = async (req, res) => {
            try {
                let response = await this.orderService.save(req.body);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editOrder = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let newOrder = req.body;
                let response = await this.orderService.updateOrder(idOrder, newOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByStatus = async (req, res) => {
            try {
                let id_User = req.params.id_User;
                let response = await this.orderService.findByStatusOrder(id_User);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findById = async (req, res) => {
            try {
                let id_User = req.params.id_User;
                let response = await this.orderService.findById(id_User);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdOrder = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let response = await this.orderService.findByIdOrder(idOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.countCart = async (req, res) => {
            try {
                let response = await this.orderService.countCart(req.params.idOrder);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.myOrderFood = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let food = await this.orderService.myOrderFood(idOrder);
                res.status(200).json(food);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.myOrder = async (req, res) => {
            try {
                let idUser = req.params.idUser;
                let limit = 3;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalBlogs = await orderService_1.default.countOrderUser(idUser);
                const count = parseInt(totalBlogs[0]['count(idOrder)']);
                let totalPage = Math.ceil(count / limit);
                let order = await this.orderService.myOrder(idUser, limit, offset);
                res.status(200).json({
                    order: order,
                    currentPage: page,
                    totalPage: totalPage
                });
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.orderDetail = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let order = await this.orderService.orderDetail(idOrder);
                res.status(200).json(order);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByOrder = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let data = req.query.value;
                let order = await orderService_1.default.findByOrder(data, idMerchant);
                return res.status(200).json(order);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderPending = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByStatus(idMerchant, 'pending');
                return res.status(200).json(order);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderSuccess = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByStatus(idMerchant, 'success');
                return res.status(200).json(order);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderDelivery = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByStatus(idMerchant, 'delivery');
                return res.status(200).json(order);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderCancelled = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByStatus(idMerchant, 'cancelled');
                return res.status(200).json(order);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderCountPending = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByCount(idMerchant, 'pending');
                if (order.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +order[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderCountSuccess = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByCount(idMerchant, 'success');
                if (order.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +order[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderCountCancelled = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByCount(idMerchant, 'cancelled');
                if (order.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +order[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findByOrderCountDelivery = async (req, res) => {
            try {
                let idMerchant = req.params.idMerchant;
                let order = await orderService_1.default.findOrderByCount(idMerchant, 'delivery');
                if (order.length < 1) {
                    return res.status(200).json(0);
                }
                else {
                    let count = +order[0].count;
                    return res.status(200).json(count);
                }
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.orderService = orderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map