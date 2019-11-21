// import * as dotenv from 'dotenv';
// import * as path from "path";
// dotenv.config({
//     path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'develop') ? '.develop' : '.develop')}`)
// })
// console.log('env=',process.env.controllers);
import "reflect-metadata";
import { createConnection, getConnectionOptions,useContainer } from 'typeorm';
import {Container} from "typedi";
import {TestService} from "../src/services/testService";
import {UserLevel} from "../src/model/user_level";
import {DemandService} from "../src/services/DemandService";
import {UserService} from "../src/services/UserService";

async function init() {
    useContainer(Container);
    const connect = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "feg",
        entities: [
            UserLevel
        ],
        synchronize: true
    });
    console.log('loadedConnectionOptions=',connect);
    const repository = Container.get(UserService)
    console.log('repository=',repository);
    const result = await repository.find();
    console.log('result=',result);
    connect.close();
}
init();
