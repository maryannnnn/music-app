import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Link {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Company', description: 'Name Link'})
    @Column({nullable: false, length: 100})
    nameLink: string;

    @ApiProperty({example: '/company', description: 'Url Link'})
    @Column({nullable: false, length: 100})
    urlLink: string;

    @ApiProperty({example: '5', description: 'Order of Links'})
    @Column({nullable: false})
    orderLink: number;

    @ApiProperty({example: '1', description: 'Parent Id'})
    @Column({nullable: true})
    parentId: number;

    @ApiProperty({example: 'true', description: 'Viseable of link'})
    @Column({nullable: true})
    isVisible: boolean;

    @ApiProperty({example: '1', description: 'Menu Id'})
    @Column({nullable: false})
    menuId: number;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}