#!/usr/bin/env node
import app from "../app"
import debug from "debug"
import http from "http"
import webSocket from 'ws'
import {getUrlParqms} from "../util/common";
import {Container} from "typedi";
import {UserService} from "../services/UserService";
import {MessageService} from "../services/MessageService";
import Message from "../model/message";
import {ChatListService} from "../services/ChatListService";

const debugLogger = debug('app:server');
// 端口号
const PORT:string = '3000';
app.set('port', PORT);
const server = http.createServer(app);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

const clients:any ={}
const wss = new webSocket.Server({
    port:3001
})

wss.on('connection',(ws,req)=>{
    console.log('request=',req.url);
    const params:any = getUrlParqms(req.url);
    const {id} =params;
    clients[id] = ws;
    console.log('开启连接');
    ws.on('error',(error)=>{
        console.error('webSocketError=',error)
    });
    ws.on('close',(close)=>{
        console.log('webSocket已关闭')
    })
    ws.on('message',(message)=>{
        console.log('webSocketMessage=',message);
        const messageObj = JSON.parse(message.toString());
        const {type,data,to,from} = messageObj;
        switch (type) {
            case 'notice':
                wssNotice(from,to, data, ws);
                break;
        }
    })
    console.log('webSocketId',id);
    // 发送消息
    // wssNotice(id,id, id+':已连接', ws);
})
// 把socket连接保存到连接池中
Container.set('clients',clients);

/**
 * 发送聊天的websocket方法
 * @param {string} from
 * @param {string} id
 * @param {string} data
 * @param ws
 */
async function  wssNotice(from:string,to:string, data:string, ws: any){
    try {
        console.log(`${from}向${to}发送${data}`);
        const messageService:MessageService = Container.get(MessageService);
        const chatlistService:ChatListService = Container.get(ChatListService);
        const message:Message = new Message();
        messageService.create(message,from,to,data);
        const unreadedNum = await messageService.countUnRead(to);
        // const chatlist = await chatlistService.findByUserId(to);
        // ws.send('正在发送...')
        const notice = JSON.stringify({
            type: 'notice',
            from,
            data,
            unreadedNum,
            // chatlist
        })
        const target = clients[to];
        if (target) {
            target.send(notice)
        } else {
        }
    } catch (err) {
        console.log(err)
    }
}


function onError(error:any) {
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
  `
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debugLogger(message);
    console.log(message);

}