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
const user_1 = require("../model/user");
const request_1 = __importDefault(require("request"));
const system_1 = require("../config/system");
const AjaxResponse_1 = __importDefault(require("../model/global/AjaxResponse"));
const UserService_1 = require("../services/UserService");
const token_1 = __importDefault(require("../util/token"));
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    insertUserByOpenid(postData) {
        // console.log('postData=',postData);
        const { code, user } = postData;
        console.log('code=', code);
        console.log('user=', user);
        const { appid, secret } = system_1.wxConfig;
        return new Promise((resolve, reject) => {
            request_1.default({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
                method: 'post',
            }, (error, response, body) => __awaiter(this, void 0, void 0, function* () {
                // console.error('error', error);
                const id = JSON.parse(body).openid;
                const result = yield this.userService.findOne(id);
                // console.log(result);
                const _user = new user_1.User();
                _user.id = JSON.parse(body).openid;
                _user.wx_name = user.nickName;
                _user.init = '1';
                _user.avatar = user.avatarUrl;
                const token = token_1.default.createToken(_user, 60 * 24);
                const info = {
                    token,
                    openid: _user.id
                };
                if (result) {
                    resolve(new AjaxResponse_1.default(0, '已有记录', info));
                }
                else {
                    const insertResult = yield this.userService.create(_user);
                    resolve(new AjaxResponse_1.default(1, '保存成功', info));
                }
            }));
        });
    }
    find() {
        return this.userService.find();
    }
};
__decorate([
    routing_controllers_1.Post('/openid'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "insertUserByOpenid", null);
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "find", null);
UserController = __decorate([
    routing_controllers_1.JsonController('/user'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map