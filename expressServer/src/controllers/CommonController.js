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
const token_1 = __importDefault(require("../util/token"));
let CommonController = class CommonController {
    constructor() {
    }
    checkToken(req) {
        const { authorization } = req.headers;
        // try{
        const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
        const payload = token_1.default.decodeToken(token);
        return payload;
        // }catch(e){
        //     console.log(e);
        //     return false;
        // }
    }
};
__decorate([
    routing_controllers_1.Get('checkToken'),
    __param(0, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "checkToken", null);
CommonController = __decorate([
    routing_controllers_1.JsonController('/'),
    __metadata("design:paramtypes", [])
], CommonController);
exports.default = CommonController;
//# sourceMappingURL=CommonController.js.map