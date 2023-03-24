import {Request, Response} from "express";
import orderService from "../service/orderService";



class OrderController {
    private orderService;


    constructor() {
        this.orderService = orderService;

    }
    deleteCart = async (req: Request, res: Response)=>{
        let idOrder = req.params.idOrder;
        let cart = await orderService.removeCart(idOrder);
        return res.status(200).json(cart);
    }


    getOrder = async (req: Request, res: Response)=>{
        try{
            let idMerchant = req.params.idMerchant
            let order = await orderService.getOrder(idMerchant)
            res.status(200).json(order)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    setStatusConfirm = async (req, res) => {
        try {
            let order = await this.orderService.setStatusConfirm(req.params.idOrder)
            return res.status(201).json(order)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }

    setStatusCancelled = async (req, res) => {
        try {
            let order = await this.orderService.setStatusCancelled(req.params.idOrder)
            return res.status(201).json(order)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }

    setStatusSuccess = async (req, res) => {
        try {
            let order = await this.orderService.setStatusSuccess(req.params.idOrder)
            return res.status(201).json(order)
        }catch (e) {
            return res.status(500).json(e.message)
        }
    }

    showCart = async (req: Request, res: Response)=>{
        try {
            let response = await this.orderService.showCart(req.params.idOrder);
            res.status(200).json(response)
        } catch (e){
            res.status(500).json(e.message)
        }

    }


    addCart = async (req: Request, res: Response)=>{
        try{
            let response = await this.orderService.saveCart(req.body);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    addOrder = async (req: Request, res: Response)=>{
        try{
            let response = await this.orderService.save(req.body);
            res.status(200).json(response)
        } catch (e){
            res.status(500).json(e.message)
        }
    }

    editOrder = async (req: Request, res: Response) => {
        try{
            let idOrder = req.params.idOrder;
            let newOrder = req.body;
            let response = await this.orderService.updateOrder(idOrder, newOrder);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    findByStatus = async (req: Request, res: Response)=>{
        try{
            let id_User = req.params.id_User
            let response = await this.orderService.findByStatusOrder(id_User);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    findById = async (req: Request, res: Response)=>{
        try{
            let id_User = req.params.id_User
            let response = await this.orderService.findById(id_User);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdOrder = async (req: Request, res: Response)=>{
        try{
            let idOrder = req.params.idOrder
            let response = await this.orderService.findByIdOrder(idOrder);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    countCart = async (req: Request, res: Response)=>{
        try{
            let response = await this.orderService.countCart(req.params.idOrder);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    myOrderFood = async (req: Request, res: Response) => {
        try{
            let idOrder = req.params.idOrder
            let food = await this.orderService.myOrderFood( idOrder)
            res.status(200).json(food)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    myOrder = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser
            let limit = 3;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let totalBlogs = await orderService.countOrderUser(idUser);
            const count = parseInt(totalBlogs[0]['count(idOrder)']);
            let totalPage = Math.ceil( count/limit);
            let order = await this.orderService.myOrder(idUser,limit,offset)
            res.status(200).json({
                order:order,
                currentPage: page,
                totalPage: totalPage
            })
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    orderDetail = async (req: Request, res: Response) => {
        try {

            let idOrder = req.params.idOrder
            let order = await this.orderService.orderDetail(idOrder)
            res.status(200).json(order)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    findByOrder = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let data = req.query.value
            let order = await orderService.findByOrder(data, idMerchant);
            return res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderPending = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByStatus(idMerchant,'pending');
            return res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderSuccess = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByStatus(idMerchant,'success');
            return res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderDelivery = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByStatus(idMerchant,'delivery');
            return res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderCancelled = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByStatus(idMerchant,'cancelled');
            return res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderCountPending = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByCount(idMerchant,'pending');
            if (order.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +order[0].count
                return res.status(200).json(count);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderCountSuccess = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByCount(idMerchant,'success');
            if (order.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +order[0].count
                return res.status(200).json(count);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderCountCancelled = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByCount(idMerchant,'cancelled');
            if (order.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +order[0].count
                return res.status(200).json(count);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findByOrderCountDelivery = async (req: Request,res: Response) => {
        try {
            let idMerchant = req.params.idMerchant
            let order = await orderService.findOrderByCount(idMerchant,'delivery');
            if (order.length < 1) {
                return res.status(200).json(0)
            } else {
                let count = +order[0].count
                return res.status(200).json(count);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

}

export default new OrderController();