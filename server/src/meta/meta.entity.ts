import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, OneToOne
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {File} from "../file/file.entity";

@Entity()
export class Meta {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Company', description: 'Title Meta'})
    @Column({nullable: true, length: 255})
    titleMeta: string;

    @ApiProperty({example: 'Company', description: 'Description Meta'})
    @Column({nullable: true, length: 500})
    descriptionMeta: string;

    @ApiProperty({example: 'Company, buisnes', description: 'Keywords Meta'})
    @Column({nullable: true, length: 255})
    keywordsMeta: string;

    @OneToOne(() => File)
    meta: File;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}