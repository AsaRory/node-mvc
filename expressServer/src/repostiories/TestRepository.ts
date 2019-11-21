import { EntityRepository, Repository } from 'typeorm';
import {Service} from 'typedi'

import { UserLevel } from '../model/user_level';

@EntityRepository(UserLevel)
export class TestRepository extends Repository<UserLevel> {
}
