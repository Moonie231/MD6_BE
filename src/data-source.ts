import "reflect-metadata"
import { DataSource } from "typeorm";
import {Merchant} from "./model/Merchant";
import {Payment} from "./model/Payment";
import {User} from "./model/User";
import {Food} from "./model/Food";
import {Category} from "./model/Category";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "case_md6",
    synchronize: true,
    entities: [Merchant,User,Food,Category]
})
