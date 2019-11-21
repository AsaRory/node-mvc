"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
// 可以修改选择的env文件
dotenv.config({ path: path_1.default.join(process.cwd(), `.env${((process.env.NODE_ENV === 'develop') ? '.develop' : '')}`) });
/**
 * 这个文件计划的是可能进行改动的配置。如加密秘钥
 */
exports.tokenConfig = {
    secret: 'AsaRory',
    openUrl: [
        /^\/index/,
    ]
};
exports.database = {
    prefix: 'nideshop_'
};
exports.wxConfig = {
    appid: process.env.WX_APPID,
    secret: process.env.WX_SECRET
};
// console.log('wxConfig=',wxConfig);
// console.log(process)
//# sourceMappingURL=system.js.map