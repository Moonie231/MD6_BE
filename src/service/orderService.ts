import {Order} from "../model/order";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {OrderDetail} from "../model/OrderDetail";

class OrderService {
    private orderRepository;
    private orderDetailRepository
    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail)
    }

    deleteCart = async (id_Order)=> {
        let cart = await this.orderDetailRepository.findOneBy({id_Order:id_Order});
        if(!cart){
            return 'Can not remove product';
        }
        this.orderDetailRepository.delete({id_Order: id_Order});
        return  cart

    }

    getOrder = async (idUser)=> {
        let sql = `select o.idOrder, o.Date,o. totalMoney,o.status, u.username from order o join user u on o.id_User = u.idUser where  o.status != 'buying'`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by id order';
        }
        return order;
    }

    showCart = async (idOrderDetail) => {
        let sql = `select oD.idOrderdetail, f.nameFood,f.price, f.description, f.img, oD.quantity from orderDetail oD  join food f  on oD.id_Food = f.idFood where oD.id_Order = ${idOrderDetail}`
        let cart = this.orderRepository.query(sql)
        if(!cart){
            return 'Can not find cart'
        }
        return  cart
    }

    save = async (value) => {
        let order = this.orderRepository.save(value);
        if(!order){
            return 'Can not save order'
        }
        return order
    }

    updateOrder = async (idOrder, newOrder)=>{
        let order = await this.orderRepository.findOneBy({idOrder:idOrder});
        if(!order){
            return 'Can not update order';
        }
        this.orderRepository.update({idOrder: idOrder}, newOrder);
        return "Updated order"
    }

    findById = async (idUser)=> {
        let sql = `select * from order o where o.id_User = ${idUser} and  o.status != 'buying'`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by id order';
        }
        return order;
    }

    findByStatusOrder = async (idUser)=> {
        let sql =`select * from order o where o.id_User = ${idUser} and  o.status = 'buying';`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by status order';
        }
        return order;
    }


    saveCart = async (values) => {
        let cart = this.orderDetailRepository.save(values);
        if(!cart){
            return 'Can not save cart'
        }
        return  'Saved cart'
    }

    countCart = async (idOrder)=> {
        let sql =`select count(.idOrder) as countCart from orderDetail oD where oD.id_Order = ${idOrder};`
        let countCart = await this.orderRepository.query(sql);
        if(!countCart){
            return 'Can not countCart';
        }
        return countCart[0].countCart;
    }

}

export default new OrderService();