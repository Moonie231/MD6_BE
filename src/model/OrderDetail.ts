import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    idOrderDetail : number;
    @Column({nullable:true})
    id_Food : number;
    @Column({nullable:true})
    id_Order : number;
    @Column({nullable:true})
    quantity : number;
    @Column({nullable:true,type:"float"})
    price : number;
    @Column({nullable:true})
    priceCoupon : number;
}
