import {ApiProperty} from "@nestjs/swagger";

export class CreateFileDto {
    constructor(param: { title: string; titleLong: string; alt: string; description: string; original: string; preview: string; src: string; thumbnail: string; }) {
        this.title = title;
        this.titleLong = titleLong;
        this.alt = alt;
        this.description = description;
        this.original = original;
        this.preview = preview;
        this.src = src;
        this.thumbnail = rthumbnail;
    }

    @ApiProperty({example: 'Company', description: 'Title file'})
    title: string;

    @ApiProperty({example: 'Company Long', description: 'Title long file'})
    titleLong: string;

    @ApiProperty({example: 'Company', description: 'alt file'})
    alt: string;

    @ApiProperty({example: 'Company', description: 'description file'})
    description: string;

    @ApiProperty({example: 'Company', description: 'original file'})
    original: string;

    @ApiProperty({example: '/uploads/portfolio/preview/portfolio-preview-0.jpeg', description: 'preview file'})
    preview: string;

    @ApiProperty({example: '/uploads/portfolio/middle/portfolio-middle-0.jpeg', description: 'src file'})
    src: string;

    @ApiProperty({example: '/uploads/user/5/thumbnail/5.jpg', description: 'thumbnail file'})
    thumbnail: string;
}