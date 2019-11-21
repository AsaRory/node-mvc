import {PrimaryColumn, Column, Entity} from "typeorm";

// 因为数据库不能用require
@Entity('chatList')
export class ChatList {

    @PrimaryColumn()
    public id: string;
    @Column({
        default: null
    })
    public unread:string;
    @Column({
        default: null
    })
    public avatar:string;

    @Column({
        default: null
    })
    public name:string;
    @Column({
        default: null
    })
    public new_message:string;
    @Column({
        default: null
    })
    public time:string;
    @Column({
        default: null
    })
    public user_id:string;
    @Column({
        default: null
    })
    public to_user_id:string;

}

export default ChatList;
