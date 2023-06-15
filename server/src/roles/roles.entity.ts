import {
    Entity,
    Column,
    PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Users} from "../users/users.entity";

@Entity()
export class Roles {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Unique value of role'})
    @Column({ unique: true, length: 100, nullable: false })
    value: string;

    @ApiProperty({example: 'Administrator', description: 'Description of role'})
    @Column({ unique: true, length: 100, nullable: false })
    description: string;

    @ManyToMany(() => Users)
    //@JoinTable()
    users: Users[];

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
   }