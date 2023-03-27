import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CouponDetail {
    @PrimaryGeneratedColumn()
    idCouponDetail: number;
    @Column()
    id_Food: number;
    @Column()
    id_Coupon: number;
}
