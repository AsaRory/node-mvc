import {EntityRepository, Repository} from "typeorm";
import {Message} from "../model/message";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{
    public getChatlistMessage(from:string,to:string):Promise<Message[]>{
        return this.createQueryBuilder().select().where(`(sender='${from}' and receiver='${to}') or (sender='${to}' and receiver='${from}') order by send_time`).getMany()
    }

    public clearUnread(from:string,to:string){
        return this.query(`update message set readed='0' where sender='${from}' and receiver='${to}'`)
    }
}