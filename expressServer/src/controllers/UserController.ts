import {Body, Get, JsonController, Post, QueryParam} from "routing-controllers";
import {User} from "../model/user";
import Request from "request";
import {
    wxConfig
} from "../config/system";
import AjaxResponse from "../model/global/AjaxResponse";
import {UserService} from "../services/UserService";
import Token from '../util/token'
@JsonController('/user')
export default class UserController {
    constructor(private userService: UserService) {
    }

    @Post('/openid')
    public insertUserByOpenid(@Body() postData: any) {
        // console.log('postData=',postData);
        const {code, user} = postData;
        console.log('code=',code);
        console.log('user=',user);
        const {appid, secret} = wxConfig;
        return new Promise((resolve, reject) => {
            Request(
                {
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
                    method: 'post',
                    // body: data ? JSON.stringify(data) : "",
                }, async (error, response, body)=>{
                    // console.error('error', error);
                    const id = JSON.parse(body).openid;

                    const result =await this.userService.findOne(id);
                    // console.log(result);
                    const _user = new User();
                    _user.id = JSON.parse(body).openid;
                    _user.wx_name = user.nickName;
                    _user.init = '1';
                    _user.avatar = user.avatarUrl;
                    const token =  Token.createToken(_user,60*24);
                    const info:any = {
                        token,
                        openid:_user.id
                    }
                    if (result) {
                        resolve (new AjaxResponse(0, '已有记录',info));
                    } else {
                        const insertResult = await this.userService.create(_user)
                        resolve(new AjaxResponse(1, '保存成功',info))
                    }
                }
            )
        })
    }

    @Get()
    public find(){
        return this.userService.find();
    }


}