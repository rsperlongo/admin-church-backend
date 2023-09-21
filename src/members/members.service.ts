import { UpdateMembersDto } from './../@core/domain/dto/updateMembers.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberDto } from 'src/@core/domain/dto/Members.dto';
import { CreateMemberDTO } from 'src/@core/domain/dto/createMembers.dto';
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

    async createMember(member: CreateMemberDTO) {
        const newMember = await this.membersRepository.create(member);
        await this.membersRepository.save(newMember);
        return newMember;
      }

    async update(id: string, updateMembers: UpdateMembersDto) {
        const members = await this.membersRepository.preload({
            id,
            ...updateMembers
        });
        if(!members) {
            throw new HttpException(`Member ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return members;
    }

    async remove(id: string) {
        const members = await this.membersRepository.findOne({ where: { id } });

        if(!members) {
            throw new NotFoundException(`Member ${id} not found`);
        }
        return this.membersRepository.remove(members);
    }
}