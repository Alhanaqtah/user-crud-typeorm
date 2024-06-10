import {DataSource, Repository} from 'typeorm';
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
}