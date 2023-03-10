import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    idUser : number;
    @Column()
    username : string;
    @Column()
    userPassword : string;
    @Column({nullable : true})
    address : string;
    @Column({nullable : true})
    email : string;
    @Column({nullable : true})
    phone : string;
    @Column({nullable : true})
    role : number;
    @Column({nullable : true})
    avatar : string;
}
