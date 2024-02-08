import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne, JoinTable
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Meta} from "../meta/meta.entity";

@Entity()
export class File {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Company', description: 'Title file'})
    @Column({nullable: false, length: 200})
    title: string;

    @ApiProperty({example: 'Company Long', description: 'Title long file'})
    @Column({nullable: true, length: 200})
    titleLong: string;

    @ApiProperty({example: 'Company', description: 'alt file'})
    @Column({nullable: true, length: 200})
    alt: string;

    @ApiProperty({example: 'Company', description: 'description file'})
    @Column({nullable: true, length: 200})
    description: string;

    @ApiProperty({example: 'Company', description: 'original file'})
    @Column({nullable: true, length: 200})
    original: string;

    @ApiProperty({example: '/uploads/portfolio/preview/portfolio-preview-0.jpeg', description: 'preview file'})
    @Column({nullable: true, length: 200})
    preview: string;

    @ApiProperty({example: '/uploads/portfolio/middle/portfolio-middle-0.jpeg', description: 'src file'})
    @Column({nullable: true, length: 200})
    src: string;

    @ApiProperty({example: '/uploads/user/5/thumbnail/5.jpg', description: 'thumbnail file'})
    @Column({nullable: true, length: 200})
    thumbnail: string;

    @OneToOne(() => Meta)
    @JoinTable()
    meta: Meta;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}