import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    idOrder : number;
    @Column({nullable:true})
    id_user : number;
    @Column({nullable:true})
    Date :Date;
    @Column({nullable:true,type:"float"})
    totalMoney :number;
    @Column({nullable:true})
    status :string;

}
