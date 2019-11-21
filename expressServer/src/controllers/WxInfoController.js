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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const system_1 = require("../config/system");
const request_1 = __importDefault(require("request"));
const UserService_1 = require("../services/UserService");
let WxInfoController = class WxInfoController {
    constructor(userService) {
        this.userService = userService;
    }
    getUserInfo(code) {
        console.log('code', code);
        const { appid, secret } = system_1.wxConfig;
        return new Promise((resolve, reject) => {
            request_1.default({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
                method: 'post',
            }, function (error, response, body) {
                console.error('error', error);
                console.log('body', JSON.parse(body));
                // const id = JSON.parse(body).openid;
                // const result =  this.userService.findOne(id);
                // console.log(result);
                // if(result){
                //     return new AjaxResponse(1,'已有记录');
                // }else{
                //     this.userService
                // }
                resolve(JSON.parse(body));
                return body;
            });
        });
    }
};
__decorate([
    routing_controllers_1.Get('/getUserInfo'),
    __param(0, routing_controllers_1.QueryParam('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WxInfoController.prototype, "getUserInfo", null);
WxInfoController = __decorate([
    routing_controllers_1.JsonController('/wx'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], WxInfoController);
exports.default = WxInfoController;
//# sourceMappingURL=WxInfoController.js.map