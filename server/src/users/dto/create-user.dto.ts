import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "../../roles/roles.entity";

export class CreateUserDto {
    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    readonly email: string;
    @ApiProperty({example: '3456iuhi2u5', description: 'Password'})
    readonly password: string;
}

export class FullUserDto {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly nik: string;
    readonly email: string;
    readonly password: string;
    readonly shippingAddress: string;
    readonly billingAddress: string;
    readonly mobile: string;
    readonly roles: Roles[];
    readonly isActive: boolean;
    readonly banned: boolean;
    readonly banReason: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}