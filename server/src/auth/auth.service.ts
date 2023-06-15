import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto, FullUserDto} from "../users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import {LocalStrategy} from "./localStrategy";
import * as bcrypt from "bcrypt";
import {Users} from "../users/users.entity";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService,
                private readonly localStrategy: LocalStrategy) {}

    async login(userDto: CreateUserDto) {
        const user = await this.localStrategy.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate= await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }


    // Generate Token
    private async generateToken(user: FullUserDto){
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {token: this.jwtService.sign(payload)};
    }

    // Check Token
    verifyToken(token: string): any {
        return this.jwtService.verify(token);
    }

}
