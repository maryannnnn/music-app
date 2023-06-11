import {Injectable} from '@nestjs/common';
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

    async createUser(dto: CreateUserDto) {
        const user = this.usersRepository.create(dto);
        return await this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find()
    }
}

