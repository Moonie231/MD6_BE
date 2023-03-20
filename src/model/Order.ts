import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    idOrder : number;
    @Column({nullable:true})
    id_user : number;
    @Column({nullable:true})
    Date :string;
    @Column({nullable:true,type:"float"})
    totalMoney :number;
    @Column({nullable:true})
    status :string;
}
