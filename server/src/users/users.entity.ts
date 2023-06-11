import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "../roles/roles.entity";

@Entity()
export class Users {
    @ApiProperty({example: '1', description: 'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Jon', description: 'User Name'})
    @Column({nullable: true})
    firstName: string;

    @ApiProperty({example: 'Brown', description: 'User Family'})
    @Column({nullable: true})
    lastName: string;

    @ApiProperty({example: 'CatJon', description: 'User nik'})
    @Column({nullable: true})
    nik: string;

    @ApiProperty({example: 'user@gmail.com', description: 'User email'})
    @Column({ unique: true, length: 100, nullable: false })
    email: string;

    @ApiProperty({example: '1hfdj5h38', description: 'Password'})
    @Column({nullable: false})
    password: string;

    @ApiProperty({example: '1234344, New York, str.Gordon 34, ap.67', description: 'User shipping address'})
    @Column({nullable: true})
    shippingAddress: string;

    @ApiProperty({example: '1234344, New York, str.Gordon 34, ap.67', description: 'User billing address'})
    @Column({nullable: true})
    billingAddress: string;

    @ApiProperty({example: '+54-567-475-56', description: 'User mobile'})
    @Column({nullable: true})
    mobile: string;

    @ManyToMany(() => Roles)
    roles: Roles[];
    //
    // @OneToMany(() => Post, post => post.user)
    // posts: Post[];

    @ApiProperty({example: 'false', description: 'User Online'})
    @Column({ default: false })
    isActive: boolean;

    @ApiProperty({example: 'true', description: 'Banned or not'})
    @Column({ default: false })
    banned: boolean;

    @ApiProperty({example: 'For hooliganism', description: 'Ban reason'})
    @Column({ nullable: true })
    banReason: string;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Created date'})
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({example: '2023-06-11T13:22:49.960Z', description: 'Updated date'})
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}