"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpError_1 = __importDefault(require("../model/global/httpError"));
const jwt = require('jsonwebtoken');
// 获取token配置
const { tokenConfig } = require('../config/system');
const token = {
    /**
     * 生成token码
     * @param userInfo
     * @param timeout[超时时间]
     * @returns String
     */
    createToken: function (userInfo = { username: undefined }, timeout = 30) {
        // payload信息,先放一些默认信息
        const payload = {};
        // 合并自定义信息
        Object.assign(payload, userInfo);
        // 生成token
        const token = jwt.sign(payload, tokenConfig.secret, { expiresIn: timeout * 60 }).toString();
        return token;
    },
    /**
     *  解析token
     * @param token
     * @returns {*}
     */
    decodeToken: function (token = '') {
        // 解析token
        const payload = jwt.verify(token, tokenConfig.secret, (error, decoded) => {
            if (error) {
                console.log('解析token', error.message);
                throw new httpError_1.default(401, -1, '您还没有登录。暂无此请求权限');
            }
            return decoded;
        });
        return payload;
    }
};
console.log('token=', token.createToken({ username: 'zhangsan' }));
exports.default = token;
//# sourceMappingURL=token.js.map