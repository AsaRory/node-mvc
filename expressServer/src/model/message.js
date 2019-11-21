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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// 因为数据库不能用require
let Message = class Message {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "receiver", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "message_type", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "readed", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "receive_time", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "send_time", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], Message.prototype, "chat_list_id", void 0);
Message = __decorate([
    typeorm_1.Entity('message')
], Message);
exports.Message = Message;
exports.default = Message;
//# sourceMappingURL=message.js.map