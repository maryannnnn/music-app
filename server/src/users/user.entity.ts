import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany} from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    nik: string;

    @Column({ unique: true })
    email: string;

    @Column()
    shippingAddress: string;

    @Column()
    billingAddress: string;

    @Column()
    mobile: string;

    @Column()
    password: string;

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

    @Column()
    createdDate: string;

    @Column()
    updatedDate: string;
}