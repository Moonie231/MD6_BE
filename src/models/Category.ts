import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    idCategory : number;
    @Column()
    nameCategory: string;
}
