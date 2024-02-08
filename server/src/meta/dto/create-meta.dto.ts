import {ApiProperty} from "@nestjs/swagger";

export class CreateMetaDto {
    @ApiProperty({example: 'Company', description: 'Title Meta'})
    readonly titleMeta: string;

    @ApiProperty({example: 'Company', description: 'description Meta'})
    readonly descriptionMeta: string;

    @ApiProperty({example: 'Company', description: 'keywords Meta'})
    readonly keywordsMeta: string;
}