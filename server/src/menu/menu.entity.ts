import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, JoinTable
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Menu {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Company', description: 'Name Link'})
    @Column({nullable: true})
    nameLink: string;

    @ApiProperty({example: '/company', description: 'Url Link'})
    @Column({nullable: true})
    urlLink: string;

    @ApiProperty({example: 'CatJon', description: 'Order of Links'})
    @Column({nullable: true})
    orderLink: number;

    @ApiProperty({example: '1', description: 'menuId'})
    @Column({nullable: true})
    menuId: number;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}