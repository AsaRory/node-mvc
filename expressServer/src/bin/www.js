#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const common_1 = require("../util/common");
const typedi_1 = require("typedi");
const MessageService_1 = require("../services/MessageService");
const message_1 = __importDefault(require("../model/message"));
const ChatListService_1 = require("../services/ChatListService");
const debugLogger = debug_1.default('app:server');
// 端口号
const PORT = '3000';
app_1.default.set('port', PORT);
const server = http_1.default.createServer(app_1.default);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
const clients = {};
const wss = new ws_1.default.Server({
    port: 3001
});
wss.on('connection', (ws, req) => {
    console.log('request=', req.url);
    const params = common_1.getUrlParqms(req.url);
    const { id } = params;
    clients[id] = ws;
    console.log('开启连接');
    ws.on('error', (error) => {
        console.error('webSocketError=', error);
    });
    ws.on('close', (close) => {
        console.log('webSocket已关闭');
    });
    ws.on('message', (message) => {
        console.log('webSocketMessage=', message);
        const messageObj = JSON.parse(message.toString());
        const { type, data, to, from } = messageObj;
        switch (type) {
            case 'notice':
                wssNotice(from, to, data, ws);
                break;
        }
    });
    console.log('webSocketId', id);
    // 发送消息
    // wssNotice(id,id, id+':已连接', ws);
});
// 把socket连接保存到连接池中
typedi_1.Container.set('clients', clients);
/**
 * 发送聊天的websocket方法
 * @param {string} from
 * @param {string} id
 * @param {string} data
 * @param ws
 */
function wssNotice(from, to, data, ws) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`${from}向${to}发送${data}`);
            const messageService = typedi_1.Container.get(MessageService_1.MessageService);
            const chatlistService = typedi_1.Container.get(ChatListService_1.ChatListService);
            const message = new message_1.default();
            messageService.create(message, from, to, data);
            const unreadedNum = yield messageService.countUnRead(to);
            // const chatlist = await chatlistService.findByUserId(to);
            // ws.send('正在发送...')
            const notice = JSON.stringify({
                type: 'notice',
                from,
                data,
                unreadedNum,
            });
            const target = clients[to];
            if (target) {
                target.send(notice);
            }
            else {
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = 'Port ' + PORT;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const message = `
  ===============================================
  The process.env.NODE_ENV = ${process.env.NODE_ENV}
  The applicaion is started in ${PORT}
  you can see it at
  http://localhost:${PORT}
  you can use [ctrl+c] exit the application
  `;
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debugLogger(message);
    console.log(message);
}
//# sourceMappingURL=www.js.map