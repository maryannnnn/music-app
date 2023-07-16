import {ApiProperty} from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty({example: 'Company', description: 'Name of company'})
    readonly nameLink: string;
    @ApiProperty({example: '/company', description: 'Url of company page'})
    readonly urlLink: string;
    @ApiProperty({example: '5', description: 'Number of order'})
    readonly orderLink: number;
    @ApiProperty({example: '2', description: 'menuId of menu'})
    readonly menuId: number;
}