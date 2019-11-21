"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const message_1 = require("../model/message");
let MessageRepository = class MessageRepository extends typeorm_1.Repository {
    getChatlistMessage(from, to) {
        return this.createQueryBuilder().select().where(`(sender='${from}' and receiver='${to}') or (sender='${to}' and receiver='${from}') order by send_time`).getMany();
    }
    clearUnread(from, to) {
        return this.query(`update message set readed='0' where sender='${from}' and receiver='${to}'`);
    }
};
MessageRepository = __decorate([
    typeorm_1.EntityRepository(message_1.Message)
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=MessageRepository.js.map