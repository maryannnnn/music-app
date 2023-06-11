import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    nik: string;

    @Column({ unique: true, length: 100, nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    shippingAddress: string;

    @Column({nullable: true})
    billingAddress: string;

    @Column({nullable: true})
    mobile: string;

    // @ManyToMany(() => Role)
    // @JoinTable()
    // roles: Role[];
    //
    // @OneToMany(() => Post, post => post.user)
    // posts: Post[];

    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    banned: boolean;

    @Column({ nullable: true })
    banReason: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}