import {PrimaryColumn, Column, Entity} from "typeorm";

// 因为数据库不能用require
@Entity('message')
export class Message {

    @PrimaryColumn()
    public id: string;
    @Column({
        default: null
    })
    public sender:string;
    @Column({
        default: null
    })
    public receiver:string;
    @Column({
        default: null
    })
    public message:string;
    @Column({
        default: null
    })
    public message_type:string;
    @Column({
        default: null
    })
    public readed:string;
    @Column({
        default: null
    })
    public receive_time:string;
    @Column({
        default: null
    })
    public send_time:string;
    @Column({
        default: null
    })
    public chat_list_id:string;

}

export default Message;
