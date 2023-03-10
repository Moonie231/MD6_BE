import express from 'express';
import bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";

import cors from 'cors';
import {router} from "./src/routes/router";

const app = express();
AppDataSource.initialize().then(() => {
    console.log('Connect database success')
})
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);

app.listen(8000, () => {
    console.log('Server is running')
})
