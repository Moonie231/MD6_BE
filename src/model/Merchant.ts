import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    idMerchant : number;
    @Column({nullable:true})
    nameMerchant: string;
    @Column({nullable:true})
    merchantPassword: string;
    @Column({nullable:true})
    email: string;
    @Column({nullable:true})
    address : string;
    @Column({nullable:true})
    phone : string;
    @Column({nullable:true, default: "pending approval"})
    status : string;
    @Column({nullable:true})
    image : string;
}
