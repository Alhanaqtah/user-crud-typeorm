import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string;

    @Column({nullable: true})
    name!: string;

    @Column({nullable: true})
    surname!: string;

    @Column({nullable: true})
    patronomic!: string;

    @Column({unique: true})
    email!: string;
}