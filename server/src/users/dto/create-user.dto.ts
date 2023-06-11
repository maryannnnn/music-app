import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    readonly email: string;
    @ApiProperty({example: '3456iuhi2u5', description: 'Password'})
    readonly password: string;
}