import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { TestRepository } from '../repostiories/TestRepository';
import { UserLevel } from '../model/user_level';


@Service()
export class TestService {

    constructor(
        @OrmRepository() private testRepository: TestRepository,
    ) { }

    public find(): Promise<UserLevel[]> {
        console.log('查找对象',);
        return this.testRepository.find();
    }


}
