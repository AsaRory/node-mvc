"use strict";
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
const system_1 = require("../../config/system");
const httpError_1 = __importDefault(require("../../model/global/httpError"));
const token_1 = __importDefault(require("../../util/token"));
function authorization(action, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        // 添加token验证
        const { request, response, next, context } = action;
        const openUrl = system_1.tokenConfig.openUrl;
        for (let url of openUrl) {
            if (url.test(request.originalUrl)) {
                next();
                return false;
            }
        }
        const err = new httpError_1.default(401, -1);
        const { authorization } = request.headers;
        const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
        const payload = token_1.default.decodeToken(token);
        if (payload) {
            if (new Date().getTime() > payload.exp * 1000) {
                err.message = `${payload.username}登录过期`;
                next(err);
                return false;
            }
        }
        else {
            err.message = `请先进行登陆`;
            next(err);
            return false;
        }
        console.log('content=', context);
        // context.set('_userInfo',payload);
        // next();
        return true;
    });
}
exports.authorization = authorization;
function currentUser(action, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = action;
        const { authorization } = request.headers;
        console.log('authorization=', authorization);
        const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
        const payload = token_1.default.decodeToken(token);
        return payload;
    });
}
exports.currentUser = currentUser;
//# sourceMappingURL=checker.js.map