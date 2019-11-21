import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
import {ChatListRepository} from "../repostiories/ChatListRepository";
import {ChatList} from "../model/chatList";
import {v1 as UUID} from "uuid";
import {MessageRepository} from "../repostiories/MessageRepository";
import {UserRepository} from "../repostiories/UserRepository";


@Service()
export class ChatListService{
    constructor( @OrmRepository() private chatListRepository: ChatListRepository,
                 @OrmRepository() private messageRepository:MessageRepository,
                 @OrmRepository() private userRepository:UserRepository,
    ){

    }

    public find():Promise<ChatList[]>{
        return this.chatListRepository.find();
    }

    /**
     * 获取是否存在对话
     * @param {string} id
     * @param {string} to_user_id
     * @returns {Promise<ChatList>}
     */
    public findHasDialog(user_id:string,to_user_id:string):Promise<ChatList>{
        return this.chatListRepository.findOne({user_id,to_user_id});
    }

    public async create(user_id : string,to_user_id : string,new_message:string,name:string){
        // 对话列表信息
        const chatlist = new ChatList();
        chatlist.id = UUID();
        chatlist.user_id = user_id;
        chatlist.to_user_id = to_user_id;
        chatlist.new_message = new_message;
        chatlist.time = new Date().getTime().toString();
        chatlist.name = name;
        chatlist.unread = '1';
        chatlist.avatar = (await this.userRepository.findOne({id:to_user_id})).avatar;
        return this.chatListRepository.save(chatlist);
    }

    public findByUserId(user_id:string):Promise<ChatList[]>{
        console.log('user_id=',user_id)
        return this.chatListRepository.find({user_id});
    }
}