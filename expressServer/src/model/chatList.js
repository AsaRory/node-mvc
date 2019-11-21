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
let ChatList = class ChatList {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], ChatList.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "unread", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "new_message", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "time", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({
        default: null
    }),
    __metadata("design:type", String)
], ChatList.prototype, "to_user_id", void 0);
ChatList = __decorate([
    typeorm_1.Entity('chatList')
], ChatList);
exports.ChatList = ChatList;
exports.default = ChatList;
//# sourceMappingURL=chatList.js.map