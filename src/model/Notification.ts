import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    idNotification : number;
    @Column({nullable:true})
    id_User : number;
    @Column({nullable:true})
    id_Order : number;
    @Column({nullable:true})
    setStatus : string;
    @Column({nullable:true,default:false})
    seenUser : boolean ;
    @Column({nullable:true,default:false})
    seenMerchant : boolean ;
    @Column({nullable:true})
    time : Date ;
}
