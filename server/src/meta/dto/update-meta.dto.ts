import {ApiProperty} from "@nestjs/swagger";

export class UpdateMetaDto {
    @ApiProperty({example: '2', description: 'Id of Meta'})
    readonly id: number;

    @ApiProperty({example: 'Company', description: 'Title Meta'})
    readonly titleMeta: string;

    @ApiProperty({example: 'Company', description: 'description Meta'})
    readonly descriptionMeta: string;

    @ApiProperty({example: 'Company', description: 'keywords Meta'})
    readonly keywordsMeta: string;
}