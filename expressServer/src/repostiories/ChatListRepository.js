"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const chatList_1 = require("../model/chatList");
let ChatListRepository = class ChatListRepository extends typeorm_1.Repository {
    clearUnread(from, to) {
        return this.query(`update chatList set unread=null where to_user_id='${from}' and user_id='${to}'`);
    }
};
ChatListRepository = __decorate([
    typeorm_1.EntityRepository(chatList_1.ChatList)
], ChatListRepository);
exports.ChatListRepository = ChatListRepository;
//# sourceMappingURL=ChatListRepository.js.map