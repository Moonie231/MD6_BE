import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    idAddress : number;
    @Column({nullable:true})
    nameAddress : string;
    @Column({nullable:true})
    id_User : number;
}
