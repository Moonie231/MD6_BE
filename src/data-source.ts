import "reflect-metadata"
import { DataSource } from "typeorm";
import {Merchant} from "./models/Merchant";
import {Payment} from "./models/Payment";
import {User} from "./models/User";
import {Food} from "./models/Food";
import {Category} from "./models/Category";

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
