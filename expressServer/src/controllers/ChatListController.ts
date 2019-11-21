import {Authorized, Body, CurrentUser, Get, JsonController, Param, Post} from "routing-controllers";
import {ChatList} from "../model/chatList";
import {ChatListService} from "../services/ChatListService";
import User from "../model/user";
import {UserService} from "../services/UserService";


@JsonController('/chatlist')
export default class RequireController {
    constructor(private chatListService: ChatListService,private userService:UserService) {
    }

    @Post()
    public create(@Body() chatList: ChatList,@CurrentUser() user:User):any {
        // console.log('require=',require);
        // console.log(user)
        // require.user_id = user.id;
        // require.avatar = user.avatar;
        // return this.chatListService.create(require);
        return null
    }

    @Post('/checkAndCreateList/:to_user_id')
    public async checkAndCreateList(@Param('to_user_id') to_user_id:string,@CurrentUser() user:User){
        const chatLists =this.chatListService.findByUserId(to_user_id);
        if (chatLists) {
            return;
        }
        const chatList:ChatList = new ChatList();
        const to_user:User =await this.userService.findOne(to_user_id);
        chatList.to_user_id = to_user_id;
        chatList.user_id = user.id;
    }


    @Get()
    public find(){
        return this.chatListService.find();
    }
    @Get('/:user_id')
    public findByUserId(@Param('user_id') user_id: string){
        return this.chatListService.findByUserId(user_id);
    }
}