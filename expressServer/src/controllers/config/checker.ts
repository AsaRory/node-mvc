import {Action} from "routing-controllers";
import {tokenConfig} from "../../config/system"
import HttpError from "../../model/global/httpError"
import tokenUtil from "../../util/token"

export async function authorization(action: Action, roles: string[]){
    // 添加token验证
    const {request,response,next,context} = action;
    const openUrl = tokenConfig.openUrl;
    for(let url of openUrl){
        if (url.test(request.originalUrl)) {
            next();
            return false;
        }
    }
    const err = new HttpError(401,-1);
    const {authorization} = request.headers;
    const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
    const payload = tokenUtil.decodeToken(token);
    if (payload) {
        if (new Date().getTime() > payload.exp * 1000) {
            err.message = `${payload.username}登录过期`;
            next(err);
            return false;
        }
    } else {
        err.message = `请先进行登陆`;
        next(err);
        return false;
    }
    console.log('content=',context);
    // context.set('_userInfo',payload);
    // next();
    return true;
}

export async function currentUser(action: Action, value?: any){
    const {request} = action;
    const {authorization} = request.headers;
    console.log('authorization=',authorization);
    const [bearer, token] = authorization ? authorization.split(' ') : [undefined, undefined];
    const payload = tokenUtil.decodeToken(token);
    return payload;
}