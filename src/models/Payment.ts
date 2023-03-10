import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    idPayment : number;
    @Column({nullable:true})
    id_Cart : number;
    @Column({nullable:true})
    id_food : number;
}
