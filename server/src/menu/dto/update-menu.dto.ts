import {ApiProperty} from "@nestjs/swagger";

export class UpdateMenuDto {
    @ApiProperty({example: '2', description: 'Id of link'})
    readonly id: number;

    @ApiProperty({example: 'Company', description: 'Name of company'})
    readonly nameLink: string;

    @ApiProperty({example: '/company', description: 'Url of company page'})
    readonly urlLink: string;

    @ApiProperty({example: '5', description: 'Number of order'})
    readonly orderLink: number;

    @ApiProperty({example: '2', description: 'Parent Id of link'})
    readonly parentId: number;

    @ApiProperty({example: '2', description: 'Menu Id of menu'})
    readonly menuId: number;

}