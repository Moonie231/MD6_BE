import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Food{
    @PrimaryGeneratedColumn()
    idFood : number;
    @Column({nullable:true})
    nameFood: string;
    @Column({nullable:true})
    description :string;
    @Column({nullable:true,type:"float"})
    price: number;
    @Column({nullable:true})
    id_Category : number;
    @Column({nullable:true})
    id_Merchant : number;
    @Column({nullable:true})
    quantityFood : number;
    @Column({nullable:true})
    img : string;
}
