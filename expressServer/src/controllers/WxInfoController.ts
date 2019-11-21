import {Get, JsonController, Post, QueryParam} from "routing-controllers";
import {
    wxConfig
} from "../config/system";
import Request from 'request'
import {UserService} from "../services/UserService";
import AjaxResponse from "../model/global/AjaxResponse";

@JsonController('/wx')
export default class WxInfoController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/getUserInfo')
    public getUserInfo(@QueryParam('code') code: string,) {
        console.log('code', code)
        const {appid, secret} = wxConfig;
        return new Promise((resolve, reject) => {
            Request(
                {
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
                    method: 'post',
                    // body: data ? JSON.stringify(data) : "",
                }, function (error, response, body) {
                    console.error('error', error);
                    console.log('body', JSON.parse(body));
                    // const id = JSON.parse(body).openid;
                    // const result =  this.userService.findOne(id);
                    // console.log(result);
                    // if(result){
                    //     return new AjaxResponse(1,'已有记录');
                    // }else{
                    //     this.userService
                    // }
                    resolve(JSON.parse(body));
                    return body
                }
            )
        })
    }
}