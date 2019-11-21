import {Body, BodyParam, CurrentUser, Get, JsonController, Post, QueryParams, Req} from "routing-controllers";
import {RequireService} from "../services/RequireService";
import {Require} from "../model/require";
import User from "../model/user";


@JsonController('/demand')
export default class RequireController {
    constructor(private requireService: RequireService) {
    }

    @Post()
    public create(@Body() require: Require,@CurrentUser() user:User):Promise<Require> {
        console.log('require=',require);
        console.log(user)
        require.user_id = user.id;
        require.avatar = user.avatar;
        return this.requireService.create(require);
    }

    @Get()
    public find(){
        console.log('请求资源');
        return this.requireService.find();
    }
    @Get('/byParams')
    public findByParams(@QueryParams() params:any,@Req() req:any){
        console.log('req=',req);
        console.log('params',params);
        return this.requireService.findByParams(params);
    }
}