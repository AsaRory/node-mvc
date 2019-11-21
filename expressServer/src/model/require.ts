import {PrimaryColumn, Column, Entity} from "typeorm";

// 因为数据库不能用require
@Entity('demand')
export class Require {

    @PrimaryColumn()
    public id: string;
    @Column({
        default: null
    })
    public children_id: string;
    @Column({
        default: null
    })
    public sex: string;
    @Column({
        default: null
    })
    public degree: string;
    @Column({
        default: null
    })
    public subject: string;
    @Column({
        default: null
    })
    public price: string;
    @Column({
        default: null
    })
    public time: string;
    @Column({
        default: null
    })
    public days: string;
    @Column({
        default: null
    })
    public remarks: string;
    @Column({
        default: null
    })
    public can_try: string;
    @Column({
        default: null
    })
    public status: string;
    @Column({
        default: null
    })
    public major: string;
    @Column({
        default: null
     })
    public teacher_id: string;
    @Column({
        default: null
    })
    public grade: string;
    @Column({
        default: null
    })
    public area: string;
    @Column({
        default: null
    })
    public avatar: string;
    @Column({
        default: null
    })
    public user_id: string;
    @Column({
        default: null
    })
    public longitude: string;
    @Column({
        default: null
    })
    public latitude: string;

    @Column({
        default: null
    })
    public end_time: string;
    @Column({
        default: null
    })
    public begin_time: string;

}

export default Require;
