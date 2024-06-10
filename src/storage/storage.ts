import {DataSource, Repository, UpdateResult} from 'typeorm';
import { User } from '../entity/user';

export class Storage {
    private dataSource: DataSource;
    public repo!: Repository<User>;

    constructor(storagePath: string) {
        this.dataSource = new DataSource({
            type: 'sqlite',
            database: storagePath,
            logging: ['info', 'error'],
            entities: [User],
            synchronize: true,
        });
    }

    async initialize(): Promise<void> {
        try {
            await this.dataSource.initialize();
            this.repo = this.dataSource.getRepository(User);
        } catch (error) {
            throw error;
        }
    }
    
    async createUser(user: User): Promise<void> {
        try {
           await this.repo.save(user); 
           return;
        } catch (error) {
            throw error;
        }
    }

    async getUser(id: number): Promise<User> {
        try {
           let u: User | null = await this.repo.findOneBy({
            id: id,
           }) 

           if (u === null) {
            throw new Error('User not found');
           }

           return u;
        } catch (error) {
            throw error;
        }
    }

    async removeUser(id: number): Promise<void> {
        try {
            this.repo.delete({
                id: id,
            })
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: number, user: User): Promise<void> {
        try {
            this.repo.update({
                id: id
            }, user)
        } catch (error) {
            throw error;
        }
    }
}