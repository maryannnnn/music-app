import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {Users} from "../users/users.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags('Authorisation')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login'})
    @ApiResponse({status: 200, type: Users})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Registration'})
    @ApiResponse({status: 200, type: Users})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
