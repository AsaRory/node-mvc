import {EntityRepository, Repository} from "typeorm";
import {ChatList} from "../model/chatList";

@EntityRepository(ChatList)
export class ChatListRepository extends Repository<ChatList>{
    public clearUnread(from:string,to:string){
        return this.query(`update chatList set unread=null where to_user_id='${from}' and user_id='${to}'`)
    }
}