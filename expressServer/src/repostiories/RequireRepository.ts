import {Require} from "../model/require";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Require)
export class RequireRepository extends Repository<Require> {

}