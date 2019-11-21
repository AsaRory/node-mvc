
import {InterceptorInterface, Action,Interceptor} from "routing-controllers";

// @Interceptor()
export default class TestInterceptor implements InterceptorInterface{

    intercept(action: Action, result: any): any | Promise<any> {
        return result.replace('h','t');
    }
}