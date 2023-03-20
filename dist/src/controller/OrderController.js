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
        this.showCart = async (req, res) => {
            try {
                console.log();
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
        this.orderService = orderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map