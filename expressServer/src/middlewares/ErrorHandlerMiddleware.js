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
const routing_controllers_1 = require("routing-controllers");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    constructor() {
    }
    error(error, req, res, next) {
        console.log('系统出错=', error);
        console.log('error.httpCode=', error.httpCode);
        error.stack = '';
        res.status(error.httpCode || 500);
        res.json(error.message);
    }
};
ErrorHandlerMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'after' }),
    __metadata("design:paramtypes", [])
], ErrorHandlerMiddleware);
exports.default = ErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandlerMiddleware.js.map