import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateMembersDto } from "src/@core/domain/dto/updateMembers.dto";
import { Members } from "src/@core/domain/entities/members.entity";
import { Repository } from "typeorm";

@Injectable()
export class MembersService {
    constructor(@InjectRepository(Members)
    private readonly membersRepository: Repository<Members>) {}

    async findAll() {
        return this.membersRepository.find();
    }

    async findOne(id: string): Promise<Members[]> {
        const members = await this.membersRepository.find({ where: { id } });
        if(!members) {
            throw new HttpException(`Member ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return members;
    }

    async create() {
        const members = await this.membersRepository.create();
        return this.membersRepository.save(members)
    }

    // async update(id: string, updateMembers: UpdateMembersDto) {
    //     const members = await this.membersRepository.find({
    //         where: {memberName },
    //     });
    //     if(!members) {
    //         throw new HttpException(`Member ${memberName} not found`, HttpStatus.NOT_FOUND)
    //     }
    //     return members;
    // }
}