import {PrimaryColumn, Column,Entity} from "typeorm";
@Entity('test')
export class UserLevel {

    @PrimaryColumn()
    public uid: string;

    @Column()
    public name: string;

    // @Column()
    // public description: string;
}

export default UserLevel