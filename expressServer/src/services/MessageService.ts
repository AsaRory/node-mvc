import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
import {MessageRepository} from "../repostiories/MessageRepository";
import {Message} from "../model/message";
import {v1 as UUID} from 'uuid'
import {ChatListService} from "./ChatListService";
import {ChatListRepository} from "../repostiories/ChatListRepository";
import {UserRepository} from "../repostiories/UserRepository";


class UsertRepository {
}

@Service()
export class MessageService{
    constructor( @OrmRepository() private messageRepository: MessageRepository,
                 @OrmRepository() private chatlistRepository: ChatListRepository,
                 @OrmRepository() private userRepository: UserRepository,
                 private chatlistService:ChatListService){

    }
    public find():Promise<Message[]>{
        return this.messageRepository.find();
    }

    public countUnRead(receiver:string):Promise <number>{
        return this.messageRepository.count({receiver,readed:'1'});
    }


    /**
     * 清除聊天未读
     * @param {string} from
     * @param {string} to
     * @returns {Promise<any>}
     */
    public async claerUnread(from:string,to:string){
       await Promise.all( [this.chatlistRepository.clearUnread(from,to),this.messageRepository.clearUnread(from,to)]);
       return this.countUnRead(to);
    }

    /*
     * 获取聊天列表
     * @param {string} from
     * @param {string} to
     * @returns {Promise<Message[]>}
     */
    public getChatlist(from:string,to:string){
        return this.messageRepository.getChatlistMessage(from,to);
    }

    /**
     * 新增消息到数据库中
     * @param {Message} message
     * @param {string} from
     * @param {string} to
     * @param {string} data
     * @returns {Promise<Message>}
     */
    public async create(message:Message,from:string,to:string,data:string):Promise<Message>{
        const chatlist =await this.chatlistService.findHasDialog(from,to);
        // 如果已经存在对话对话
        if(chatlist){
            chatlist.new_message = data;
            // 接收方列表刷新未读数量
            const unreadNum = await this.messageRepository.count({sender:from,receiver : to,readed:'1'});
            const chatlist2 = await this.chatlistService.findHasDialog(to,from);// 两边都要改
            chatlist2.new_message = data;
            chatlist2.unread =unreadNum.toString();
            this.chatlistRepository.save(chatlist);
            this.chatlistRepository.save(chatlist2);
        }else{
            const fromUser = await this.userRepository.findOne({id:from});
            const toUser = await this.userRepository.findOne({id:to});
            // 两边都要保存
            this.chatlistService.create(from,to,data,toUser.name);
            this.chatlistService.create(to,from,data,fromUser.name);
        }
        message.id = UUID();
        message.sender = from;
        message.receiver = to;
        message.message = data;
        message.readed = '1'; // 设置消息为未读;
        message.send_time = new Date().getTime().toString();
        return this.messageRepository.save(message);
    }
}