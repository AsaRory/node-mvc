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
const MessageRepository_1 = require("../repostiories/MessageRepository");
const uuid_1 = require("uuid");
const ChatListService_1 = require("./ChatListService");
const ChatListRepository_1 = require("../repostiories/ChatListRepository");
const UserRepository_1 = require("../repostiories/UserRepository");
class UsertRepository {
}
let MessageService = class MessageService {
    constructor(messageRepository, chatlistRepository, userRepository, chatlistService) {
        this.messageRepository = messageRepository;
        this.chatlistRepository = chatlistRepository;
        this.userRepository = userRepository;
        this.chatlistService = chatlistService;
    }
    find() {
        return this.messageRepository.find();
    }
    countUnRead(receiver) {
        return this.messageRepository.count({ receiver, readed: '1' });
    }
    /**
     * 清除聊天未读
     * @param {string} from
     * @param {string} to
     * @returns {Promise<any>}
     */
    claerUnread(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this.chatlistRepository.clearUnread(from, to), this.messageRepository.clearUnread(from, to)]);
            return this.countUnRead(to);
        });
    }
    /*
     * 获取聊天列表
     * @param {string} from
     * @param {string} to
     * @returns {Promise<Message[]>}
     */
    getChatlist(from, to) {
        return this.messageRepository.getChatlistMessage(from, to);
    }
    /**
     * 新增消息到数据库中
     * @param {Message} message
     * @param {string} from
     * @param {string} to
     * @param {string} data
     * @returns {Promise<Message>}
     */
    create(message, from, to, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatlist = yield this.chatlistService.findHasDialog(from, to);
            // 如果已经存在对话对话
            if (chatlist) {
                chatlist.new_message = data;
                // 接收方列表刷新未读数量
                const unreadNum = yield this.messageRepository.count({ sender: from, receiver: to, readed: '1' });
                const chatlist2 = yield this.chatlistService.findHasDialog(to, from); // 两边都要改
                chatlist2.new_message = data;
                chatlist2.unread = unreadNum.toString();
                this.chatlistRepository.save(chatlist);
                this.chatlistRepository.save(chatlist2);
            }
            else {
                const fromUser = yield this.userRepository.findOne({ id: from });
                const toUser = yield this.userRepository.findOne({ id: to });
                // 两边都要保存
                this.chatlistService.create(from, to, data, toUser.name);
                this.chatlistService.create(to, from, data, fromUser.name);
            }
            message.id = uuid_1.v1();
            message.sender = from;
            message.receiver = to;
            message.message = data;
            message.readed = '1'; // 设置消息为未读;
            message.send_time = new Date().getTime().toString();
            return this.messageRepository.save(message);
        });
    }
};
MessageService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository()),
    __param(1, typeorm_typedi_extensions_1.OrmRepository()),
    __param(2, typeorm_typedi_extensions_1.OrmRepository()),
    __metadata("design:paramtypes", [MessageRepository_1.MessageRepository,
        ChatListRepository_1.ChatListRepository,
        UserRepository_1.UserRepository,
        ChatListService_1.ChatListService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map