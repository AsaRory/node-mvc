import 'reflect-metadata';
import {useExpressServer, useContainer as routingUseContainer} from "routing-controllers";
import express from "express";
import path from "path";
import flash from "express-flash";
import lusca from "lusca";
import cookieParser from "cookie-parser";
import * as swaggerUi from "swagger-ui-express";
import {authorization, currentUser} from "./controllers/config/checker"
import fs from "fs";
import {createConnection, useContainer as ormUseContainer} from "typeorm";
import {UserLevel} from "./model/user_level";
import {User} from "./model/user";
import {Container} from 'typedi';

routingUseContainer(Container);
ormUseContainer(Container);
import {TestService} from "./services/testService";
import {Require} from "./model/require";


const morgan = require('./config/morganConfig');

const app = express();

// 设置日志输出
app.use(morgan);

// flash消息用于重定向跳转时传递消息
app.use(flash());

// 设置body能够接受post的json格式数据
app.use(express.json());

// 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib
// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(express.urlencoded({extended: false}));

// 设置cookie
app.use(cookieParser());

// 设置静态文件使用目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置安全防止xframe 和xss攻击
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// 添加swagger处理
const swaggerFile = require('./controllers/swagger.json');
swaggerFile.info = {
    title: 'expressServer',
    description: '',
    version: '0.0.1',
};
swaggerFile.servers = [
    {
        url: 'http://localhost:3000/api',
    },
    {
        url: 'http://localhost:3000/ap2',
    }
];

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))


// ======================使用routing-controllers模块配置======================
/*
 如果用本省的添加controller数组的方法。会调用require('****.ts');的方法
 实际上不能加猴嘴。会报错的。那就自己写了一个
 */
const controllerFiles = fs.readdirSync(__dirname + "/controllers");
const controllers: any = [];
controllerFiles.forEach(
    file => {
        if (/Controller\.ts$/.test(file)) {
            controllers.push(require(`./controllers/${file}`.replace('.ts', '')).default)
        }
    }
)
const middlewaresFiles = fs.readdirSync(__dirname + "/middlewares");
const middlewares: any = [];
middlewaresFiles.forEach(
    file => {
        if (/Middleware\.ts$/.test(file)) {
            middlewares.push(require(`./middlewares/${file}`.replace('.ts', '')).default)
        }
    }
)
const interceptorFiles = fs.readdirSync(__dirname + "/interceptors");
const interceptors: any = [];
interceptorFiles.forEach(
    file => {
        if (/Interceptor\.ts$/.test(file)) {
            interceptors.push(require(`./interceptors/${file}`.replace('.ts', '')).default)
        }
    }
)

const modelFiles = fs.readdirSync(__dirname + "/model");
const models: any = [];
modelFiles.forEach(
    file => {
        if (/\.ts$/.test(file)) {
            models.push(require(`./model/${file}`.replace('.ts', '')).default)
        }
    }
)


// 初始化数据库
let connect;

async function init() {
    // console.log('models=',models);
    connect = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "feg",
        entities: models,
        synchronize: true
    });
}

init();

useExpressServer(app, {
    controllers,
    middlewares,
    interceptors,
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: authorization,
    currentUserChecker: currentUser,
});
// ======================使用routing-controllers模块配置======================


// // 后面使用中间件来处理
// // 处理访问不到的资源
// app.use(function (req:any, res:any, next:any) {
//     console.log('进入');
//     // let err = new HttpError(404,-1,'系统找不到当前访问的资源');
//     // res.send('系统找不到当前访问的资源');
//     // next(err);
// });

// // 处理错误请求
// app.use(function (err:any, req:any, res:any, next:any) {
//     // set locals, only providing error in development
//     console.log('进入错误=',err);
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     // 返回错误信息
//     res.status(err.status || 500);
//     res.send({
//         code: -1,
//         message: err.message
//     })
// });

export default app;
