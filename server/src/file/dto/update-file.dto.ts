import {ApiProperty} from "@nestjs/swagger";

export class UpdateFileDto {
    @ApiProperty({example: '2', description: 'Id of file'})
    readonly id: number;

    @ApiProperty({example: 'Company', description: 'Title file'})
    title: string;

    @ApiProperty({example: 'Company Long', description: 'Title long file'})
    titleLong: string;

    @ApiProperty({example: 'Company', description: 'alt file'})
    alt: string;

    @ApiProperty({example: 'Company', description: 'description file'})
    description: string;
}