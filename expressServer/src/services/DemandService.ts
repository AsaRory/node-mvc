import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
import {DemandRepository} from "../repostiories/DemandRepository";
import {Demand} from "../model/Demand";


@Service()
export class DemandService{
    constructor( @OrmRepository() private demandRepository: DemandRepository,){

    }
    public find():Promise<Demand[]>{
        return this.demandRepository.find();
    }
}