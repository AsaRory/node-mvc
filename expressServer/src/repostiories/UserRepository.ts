import {User} from "../model/user";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}