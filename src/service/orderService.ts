import {Order} from "../model/Order";
import {AppDataSource} from "../data-source";
import {OrderDetail} from "../model/OrderDetail";

class OrderService {
    private orderRepository;
    private orderDetailRepository
    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail)
    }

    removeCart = async (idOrder)=> {
        let cart = await this.orderDetailRepository.findOneBy({idOrderDetail:idOrder});
        if(!cart){
            return 'Can not remove order';
        }
        return this.orderDetailRepository.delete({idOrderDetail: idOrder});


    }
    getOrder = async (idMerchant)=> {
        let sql =`SELECT o.idOrder,f.nameFood, SUM(od.quantity) as quantity,SUM(od.price) as price, o.totalMoney, o.status
                  FROM merchant m
                           INNER JOIN food f ON m.idMerchant = f.id_Merchant
                           INNER JOIN order_detail od ON f.idFood = od.id_Food
                           INNER JOIN \`order\` o ON od.id_Order = o.idOrder
                           INNER JOIN user u ON o.id_user = u.idUser
                  where m.idMerchant=${idMerchant} and o.status != 'watching' group by f.idFood`
        let order = await this.orderRepository.query(sql)
        return order
    }
    setStatusConfirm = async(idOrder) => {
        let checkOrder = await this.orderRepository.findOneBy({idOrder :idOrder})
        if (!checkOrder) {
            return "Order not found"
        }
        if (checkOrder.status === "pending") {
            return await this.orderRepository.update({idOrder :idOrder}, {status : "delivery"})
        }
    }
    setStatusCancelled= async(idOrder) => {
        let checkOrder = await this.orderRepository.findOneBy({idOrder :idOrder})
        if (!checkOrder) {
            return "Order not found"
        }
        if (checkOrder.status === "pending") {
            return await this.orderRepository.update({idOrder :idOrder}, {status : "cancelled"})
        }
    }


    showCart = async (idOrder) => {
        let sql = `select o_d.idOrderdetail, f.nameFood,f.img, SUM(o_d.quantity) as quantity ,SUM(o_d.price)as price from order_detail o_d  join food f  on o_d.id_Food = f.idFood where o_d.id_Order = ${idOrder} group by o_d.id_Food`
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
        else {
            let orderInfo={
                id_user:newOrder.id_user,
                totalMoney:newOrder.totalMoney,
                Date:new Date().toLocaleDateString(),
                status:'pending'
            }
            let data={
                id_user:newOrder.id_user,
                status:'watching'
            }
            await this.orderRepository.update({idOrder: idOrder}, orderInfo);
            return await this.orderRepository.save(data);
        }
    }

    findById = async (idUser)=> {
        let sql = `select * from order o where o.id_User = ${idUser} and  o.status != 'buying'`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by id order';
        }
        return order;
    }
    findByIdOrder = async (idOrder) => {
        let sql = `select *
                   from order_detail
                            join food f on order_detail.id_Food = f.idFood
                            join \`order\` on order_detail.id_Order = \`order\`.idOrder
                   where \`order\`.idOrder = ${idOrder}`
        let order = await this.orderRepository.query(sql);
        console.log(order)
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
        let sql =`select count(.idOrder) as countCart from order_detail o_d where o_d.id_Order = ${idOrder};`
        let countCart = await this.orderRepository.query(sql);
        if(!countCart){
            return 'Can not countCart';
        }
        return countCart[0].countCart;
    }

}

export default new OrderService();