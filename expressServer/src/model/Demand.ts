import {Entity, PrimaryColumn} from "typeorm";


@Entity('demand')
export  class Demand{
    @PrimaryColumn()
    public id: string;
}

// export default Demand