import {Merchant} from "../model/Merchant";
import {User} from "../model/User";
import {Category} from "../model/Category";
import {Food} from "../model/Food";

require('dotenv').config();

class DataBaseConfig{

    type: string = process.env.DB_CONNECTION || 'mysql';
    host:string =  process.env.DB_HOST || 'localhost';
    port: number = Number(process.env.DB_PORT) || 3306;
    username: string = process.env.DB_USER || 'root';
    password: string = process.env.DB_PASS || '123456';
    database: string = process.env.DB_NAME || 'case_md6';
    synchronize: boolean = false;
    logging:boolean = false;
    entities:any = [Merchant,User,Food,Category];


}

export default DataBaseConfig;