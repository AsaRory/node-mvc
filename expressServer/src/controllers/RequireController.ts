import { Body, CurrentUser, Get, JsonController, Post,BodyParam} from "routing-controllers";
import {Require} from "../model/require";
import {RequireService} from "../services/RequireService";
import User from "../model/user";


@JsonController('/require')
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
        return this.requireService.find();
    }

    @Get('/byParams')
    public findByParams(@BodyParam('params') params:any){
        return this.requireService.findByParams(params);
    }
}