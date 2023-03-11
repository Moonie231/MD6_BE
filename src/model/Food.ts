import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Food{
    @PrimaryGeneratedColumn()
    idFood : number;
    @Column({nullable:true})
    nameFood: string;
    @Column({nullable:true})
    description :string;
    @Column({nullable:true})
    price: number;
    @Column({nullable:true})
    id_Category : number;
    @Column({nullable:true})
    id_Merchant : number;
    @Column({nullable:true})
    img : string;
}
