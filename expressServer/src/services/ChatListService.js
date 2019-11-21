"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ChatListRepository_1 = require("../repostiories/ChatListRepository");
const chatList_1 = require("../model/chatList");
const uuid_1 = require("uuid");
const MessageRepository_1 = require("../repostiories/MessageRepository");
const UserRepository_1 = require("../repostiories/UserRepository");
let ChatListService = class ChatListService {
    constructor(chatListRepository, messageRepository, userRepository) {
        this.chatListRepository = chatListRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    find() {
        return this.chatListRepository.find();
    }
    /**
     * 获取是否存在对话
     * @param {string} id
     * @param {string} to_user_id
     * @returns {Promise<ChatList>}
     */
    findHasDialog(user_id, to_user_id) {
        return this.chatListRepository.findOne({ user_id, to_user_id });
    }
    create(user_id, to_user_id, new_message, name) {
        return __awaiter(this, void 0, void 0, function* () {
            // 对话列表信息
            const chatlist = new chatList_1.ChatList();
            chatlist.id = uuid_1.v1();
            chatlist.user_id = user_id;
            chatlist.to_user_id = to_user_id;
            chatlist.new_message = new_message;
            chatlist.time = new Date().getTime().toString();
            chatlist.name = name;
            chatlist.unread = '1';
            chatlist.avatar = (yield this.userRepository.findOne({ id: to_user_id })).avatar;
            return this.chatListRepository.save(chatlist);
        });
    }
    findByUserId(user_id) {
        console.log('user_id=', user_id);
        return this.chatListRepository.find({ user_id });
    }
};
ChatListService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository()),
    __param(1, typeorm_typedi_extensions_1.OrmRepository()),
    __param(2, typeorm_typedi_extensions_1.OrmRepository()),
    __metadata("design:paramtypes", [ChatListRepository_1.ChatListRepository,
        MessageRepository_1.MessageRepository,
        UserRepository_1.UserRepository])
], ChatListService);
exports.ChatListService = ChatListService;
//# sourceMappingURL=ChatListService.js.map