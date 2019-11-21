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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const chatList_1 = require("../model/chatList");
const ChatListService_1 = require("../services/ChatListService");
const user_1 = __importDefault(require("../model/user"));
const UserService_1 = require("../services/UserService");
let RequireController = class RequireController {
    constructor(chatListService, userService) {
        this.chatListService = chatListService;
        this.userService = userService;
    }
    create(chatList, user) {
        // console.log('require=',require);
        // console.log(user)
        // require.user_id = user.id;
        // require.avatar = user.avatar;
        // return this.chatListService.create(require);
        return null;
    }
    checkAndCreateList(to_user_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatLists = this.chatListService.findByUserId(to_user_id);
            if (chatLists) {
                return;
            }
            const chatList = new chatList_1.ChatList();
            const to_user = yield this.userService.findOne(to_user_id);
            chatList.to_user_id = to_user_id;
            chatList.user_id = user.id;
        });
    }
    find() {
        return this.chatListService.find();
    }
    findByUserId(user_id) {
        return this.chatListService.findByUserId(user_id);
    }
};
__decorate([
    routing_controllers_1.Post(),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatList_1.ChatList, user_1.default]),
    __metadata("design:returntype", Object)
], RequireController.prototype, "create", null);
__decorate([
    routing_controllers_1.Post('/checkAndCreateList/:to_user_id'),
    __param(0, routing_controllers_1.Param('to_user_id')), __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.default]),
    __metadata("design:returntype", Promise)
], RequireController.prototype, "checkAndCreateList", null);
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequireController.prototype, "find", null);
__decorate([
    routing_controllers_1.Get('/:user_id'),
    __param(0, routing_controllers_1.Param('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequireController.prototype, "findByUserId", null);
RequireController = __decorate([
    routing_controllers_1.JsonController('/chatlist'),
    __metadata("design:paramtypes", [ChatListService_1.ChatListService, UserService_1.UserService])
], RequireController);
exports.default = RequireController;
//# sourceMappingURL=ChatListController.js.map