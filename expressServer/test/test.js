"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as dotenv from 'dotenv';
// import * as path from "path";
// dotenv.config({
//     path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'develop') ? '.develop' : '.develop')}`)
// })
// console.log('env=',process.env.controllers);
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const user_level_1 = require("../src/model/user_level");
const UserService_1 = require("../src/services/UserService");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        typeorm_1.useContainer(typedi_1.Container);
        const connect = yield typeorm_1.createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "feg",
            entities: [
                user_level_1.UserLevel
            ],
            synchronize: true
        });
        console.log('loadedConnectionOptions=', connect);
        const repository = typedi_1.Container.get(UserService_1.UserService);
        console.log('repository=', repository);
        const result = yield repository.find();
        console.log('result=', result);
        connect.close();
    });
}
init();
//# sourceMappingURL=test.js.map