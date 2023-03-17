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
    email : string;
    @Column({nullable : true})
    phone : string;
    @Column({nullable : true, default: 1})
    role : number;
    @Column({nullable : true,default :'https://img.pikbest.com/png-images/qianku/default-avatar_2406311.png!w700wp'})
    avatar : string;
    @Column({nullable : true})
    status : boolean;
    @Column({nullable : true})
    tokenEmail : string;
}
