import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Roles} from "./roles.entity";

class CreateRoleDto {
}

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Roles) private rolesRepository: Repository<Roles>) {}

    async createRole(dto: CreateRoleDto) {
        const role = this.rolesRepository.create(dto);
        return await this.rolesRepository.save(role);
    }

    async getRoleByValue(value: string): Promise<Roles> {
        return await this.rolesRepository.findOne({where: {value}})
    }
}
