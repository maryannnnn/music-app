import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Unique value of role'})
    readonly value: string;
    @ApiProperty({example: 'Administrator', description: 'Description of role'})
    readonly description: string;
}