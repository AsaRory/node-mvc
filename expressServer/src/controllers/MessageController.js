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
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const MessageService_1 = require("../services/MessageService");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    find(from, to) {
        return this.messageService.getChatlist(from, to);
    }
    clearMessage(from, to) {
        return this.messageService.claerUnread(from, to);
    }
};
__decorate([
    routing_controllers_1.Get('/history'),
    __param(0, routing_controllers_1.QueryParam('from')), __param(1, routing_controllers_1.QueryParam('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "find", null);
__decorate([
    routing_controllers_1.Put('/clearMessage'),
    __param(0, routing_controllers_1.QueryParam('from')), __param(1, routing_controllers_1.QueryParam('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "clearMessage", null);
MessageController = __decorate([
    routing_controllers_1.JsonController('/message'),
    __metadata("design:paramtypes", [MessageService_1.MessageService])
], MessageController);
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map