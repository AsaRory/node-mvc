"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(status, code, message) {
        super();
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
exports.default = HttpError;
//# sourceMappingURL=httpError.js.map