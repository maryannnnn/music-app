import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {CreateUserDto, FullUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import {UsersService} from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    async validateUser(userDto: CreateUserDto): Promise<FullUserDto> {
        const user = await this.usersService.getUserByEmail(userDto.email)
        if(user) {
            const isPassValid =  await bcrypt.compareSync(userDto.password, user.password)
            if(isPassValid) {
                return user
            }
        }
        throw new UnauthorizedException({message: 'Wrong email or password'})
    }
}
