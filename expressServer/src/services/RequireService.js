"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const RequireRepository_1 = require("../repostiories/RequireRepository");
const uuid_1 = require("uuid");
let RequireService = class RequireService {
    constructor(requireRepository) {
        this.requireRepository = requireRepository;
    }
    // 查找列表
    find() {
        return this.requireRepository.find();
    }
    // 查找列表
    findByParams(params) {
        const { type, priceOrder, area, subject, sex, education } = params;
        const queryCondition = [];
        if (area) {
            queryCondition.push(`area=${area}`);
        }
        if (subject) {
            queryCondition.push(`subject=${subject}`);
        }
        if (sex) {
            queryCondition.push(`sex=${sex}`);
        }
        if (education) {
            queryCondition.push(`degree=${education}`);
        }
        let queryStr = queryCondition.join(' and ');
        if (priceOrder) {
            queryStr += ` order by price ${priceOrder == 0 ? 'asc' : 'desc'}`;
        }
        console.log('queryStr=', queryStr);
        return this.requireRepository.createQueryBuilder().select().where(queryStr).getMany();
    }
    //
    // // 根据id查找一个
    // public findOne(id: string): Promise<Require | undefined> {
    //     return this.requireRepository.findOne({ id });
    // }
    // 新增一个用户
    create(require) {
        return __awaiter(this, void 0, void 0, function* () {
            require.id = uuid_1.v1().toString();
            const newRequire = yield this.requireRepository.save(require);
            return newRequire;
        });
    }
};
RequireService = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository()),
    __metadata("design:paramtypes", [RequireRepository_1.RequireRepository])
], RequireService);
exports.RequireService = RequireService;
//# sourceMappingURL=RequireService.js.map