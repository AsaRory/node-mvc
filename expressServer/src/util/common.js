"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUrlParqms(url) {
    if (!url) {
        return {};
    }
    if (url.indexOf('?') < 0) {
        return {};
    }
    const urls = url.split('?');
    const parmasStr = urls[1].split('&');
    const result = {};
    parmasStr.forEach(item => {
        const keyValues = item.split('=');
        const [key, value] = keyValues;
        result[key] = value;
    });
    return result;
}
exports.getUrlParqms = getUrlParqms;
//# sourceMappingURL=common.js.map