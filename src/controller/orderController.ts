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
            let idUser = req.params.idUser
            let idOrder = req.params.idOrder
            let food = await this.orderService.myOrderFood(idUser, idOrder)
            res.status(200).json(food)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }

    myOrder = async (req: Request, res: Response) => {
        try{
            let idUser = req.params.idUser
            let order = await this.orderService.myOrder(idUser)
            res.status(200).json(order)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new OrderController();