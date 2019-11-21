import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import {UserRepository} from "../repostiories/UserRepository";
import {User} from "../model/user";


@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
    ) { }

    // 查找列表
    public find(): Promise<User[]> {
        return this.userRepository.find();
    }

    // 根据id查找一个
    public findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }


    // 新增一个用户
    public async create(user: User): Promise<User> {
        const newPet = await this.userRepository.save(user);
        return newPet;
    }

}