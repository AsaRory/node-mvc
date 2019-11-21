"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_flash_1 = __importDefault(require("express-flash"));
const lusca_1 = __importDefault(require("lusca"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const checker_1 = require("./controllers/config/checker");
const fs_1 = __importDefault(require("fs"));
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
routing_controllers_1.useContainer(typedi_1.Container);
typeorm_1.useContainer(typedi_1.Container);
const morgan = require('./config/morganConfig');
const app = express_1.default();
// 设置日志输出
app.use(morgan);
// flash消息用于重定向跳转时传递消息
app.use(express_flash_1.default());
// 设置body能够接受post的json格式数据
app.use(express_1.default.json());
// 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib
// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(express_1.default.urlencoded({ extended: false }));
// 设置cookie
app.use(cookie_parser_1.default());
// 设置静态文件使用目录
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// 设置安全防止xframe 和xss攻击
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
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
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// ======================使用routing-controllers模块配置======================
/*
 如果用本省的添加controller数组的方法。会调用require('****.ts');的方法
 实际上不能加猴嘴。会报错的。那就自己写了一个
 */
const controllerFiles = fs_1.default.readdirSync(__dirname + "/controllers");
const controllers = [];
controllerFiles.forEach(file => {
    if (/Controller\.ts$/.test(file)) {
        controllers.push(require(`./controllers/${file}`.replace('.ts', '')).default);
    }
});
const middlewaresFiles = fs_1.default.readdirSync(__dirname + "/middlewares");
const middlewares = [];
middlewaresFiles.forEach(file => {
    if (/Middleware\.ts$/.test(file)) {
        middlewares.push(require(`./middlewares/${file}`.replace('.ts', '')).default);
    }
});
const interceptorFiles = fs_1.default.readdirSync(__dirname + "/interceptors");
const interceptors = [];
interceptorFiles.forEach(file => {
    if (/Interceptor\.ts$/.test(file)) {
        interceptors.push(require(`./interceptors/${file}`.replace('.ts', '')).default);
    }
});
const modelFiles = fs_1.default.readdirSync(__dirname + "/model");
const models = [];
modelFiles.forEach(file => {
    if (/\.ts$/.test(file)) {
        models.push(require(`./model/${file}`.replace('.ts', '')).default);
    }
});
// 初始化数据库
let connect;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('models=',models);
        connect = yield typeorm_1.createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "feg",
            entities: models,
            synchronize: true
        });
    });
}
init();
routing_controllers_1.useExpressServer(app, {
    controllers,
    middlewares,
    interceptors,
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: checker_1.authorization,
    currentUserChecker: checker_1.currentUser,
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
exports.default = app;
//# sourceMappingURL=app.js.map