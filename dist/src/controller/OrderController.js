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
                let response = await this.orderService.getOrder();
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
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
                let idUser = req.params.idUser;
                let idOrder = req.params.idOrder;
                let food = await this.orderService.myOrderFood(idUser, idOrder);
                res.status(200).json(food);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.myOrder = async (req, res) => {
            try {
                let idUser = req.params.idUser;
                let order = await this.orderService.myOrder(idUser);
                res.status(200).json(order);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.orderService = orderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map