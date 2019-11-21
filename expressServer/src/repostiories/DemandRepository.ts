import {EntityRepository, Repository} from "typeorm";
import {Demand} from "../model/Demand";

@EntityRepository(Demand)
export class DemandRepository extends Repository<Demand>{

}