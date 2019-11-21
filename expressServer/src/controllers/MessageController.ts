import { Body, CurrentUser, Get, JsonController, Post,QueryParam,Put} from "routing-controllers";
import {MessageService} from "../services/MessageService";


@JsonController('/message')
export default class MessageController {
    constructor(private messageService: MessageService) {
    }


    @Get('/history')
    public find(@QueryParam('from') from:string,@QueryParam('to') to:string,){
        return this.messageService.getChatlist(from,to);
    }

    @Put('/clearMessage')
    public clearMessage(@QueryParam('from') from:string,@QueryParam('to') to:string){
        return this.messageService.claerUnread(from,to);
    }
}