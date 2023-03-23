import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    idCoupon : number;
    @Column({nullable:true})
    value : number;
    @Column({nullable:true, default: 2})
    role : number;
    @Column({nullable:true})
    id_Merchant : number;
}
