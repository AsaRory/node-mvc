import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {RequireRepository} from "../repostiories/RequireRepository";
import {Require} from "../model/require";
import {v1 as UUID} from 'uuid';
import {CurrentUser} from "routing-controllers";
import User from "../model/user";


@Service()
export class RequireService {

    constructor(
        @OrmRepository() private requireRepository: RequireRepository,
    ) {
    }

    // 查找列表
    public find(): Promise<Require[]> {
        return this.requireRepository.find();
    }

    // 查找列表
    public findByParams(params: any): Promise<Require[]> {
        const {type, priceOrder, area, subject, sex, education} = params;
        const queryCondition = [];
        if(area){
            queryCondition.push(`area=${area}`)
        }
        if(subject){
            queryCondition.push(`subject=${subject}`)
        }
        if(sex){
            queryCondition.push(`sex=${sex}`)
        }
        if(education){
            queryCondition.push(`degree=${education}`)
        }
        let queryStr =  queryCondition.join(' and ');
        if(priceOrder){
            queryStr+= ` order by price ${priceOrder == 0?'asc':'desc'}`
        }
        console.log('queryStr=',queryStr);
        return this.requireRepository.createQueryBuilder().select().where(queryStr).getMany();
    }

    //
    // // 根据id查找一个
    // public findOne(id: string): Promise<Require | undefined> {
    //     return this.requireRepository.findOne({ id });
    // }


    // 新增一个用户
    public async create(require: Require): Promise<Require> {
        require.id = UUID().toString();

        const newRequire = await this.requireRepository.save(require);
        return newRequire;
    }

}