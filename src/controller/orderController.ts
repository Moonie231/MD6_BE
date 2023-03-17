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
            let response = await this.orderService.getOrder();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
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

    countCart = async (req: Request, res: Response)=>{
        try{
            let response = await this.orderService.countCart(req.params.idOrder);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


}

export default new OrderController();