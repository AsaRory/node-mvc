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
const RequireService_1 = require("../services/RequireService");
const require_1 = require("../model/require");
const user_1 = __importDefault(require("../model/user"));
let RequireController = class RequireController {
    constructor(requireService) {
        this.requireService = requireService;
    }
    create(require, user) {
        console.log('require=', require);
        console.log(user);
        require.user_id = user.id;
        require.avatar = user.avatar;
        return this.requireService.create(require);
    }
    find() {
        console.log('请求资源');
        return this.requireService.find();
    }
    findByParams(params, req) {
        console.log('req=', req);
        console.log('params', params);
        return this.requireService.findByParams(params);
    }
};
__decorate([
    routing_controllers_1.Post(),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_1.Require, user_1.default]),
    __metadata("design:returntype", Promise)
], RequireController.prototype, "create", null);
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequireController.prototype, "find", null);
__decorate([
    routing_controllers_1.Get('/byParams'),
    __param(0, routing_controllers_1.QueryParams()), __param(1, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RequireController.prototype, "findByParams", null);
RequireController = __decorate([
    routing_controllers_1.JsonController('/demand'),
    __metadata("design:paramtypes", [RequireService_1.RequireService])
], RequireController);
exports.default = RequireController;
//# sourceMappingURL=DemandController.js.map