"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @Interceptor()
class TestInterceptor {
    intercept(action, result) {
        return result.replace('h', 't');
    }
}
exports.default = TestInterceptor;
//# sourceMappingURL=TestInterceptor.js.map