import {Injectable} from '@nestjs/common';
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
                private rolesService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER')
        user.roles = [role];
        return await this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find({relations: ['roles']})
    }

    async getUserByEmail(email: string): Promise<Users | undefined> {
        return await this.usersRepository.findOne({ where: { email }, relations: ['roles'] })
    }
}

