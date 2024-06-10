import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';

import {Storage} from './storage/storage';

// Config
let port: string = process.env.port ? process.env.port : '8080';
let storagePath: string = process.env.storage_path ? process.env.storage_path : './storage.db';

// Init router & storage
let app: Express = express();
let storage: Storage = new Storage(storagePath);
storage.initialize();

// Middleware
app.use(bodyParser.json());

app.get('/healthcheck', async (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        let user = req.body;

        if (user.username === undefined || user.email === undefined) {
            return res.status(409).json({'error': 'Invalid credentials'});
        }

        await storage.createUser(user);
        
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.status(500).json({'error': 'Internal error'});
    }
})

app.put('/users/:id', async (req: Request, res: Response) => {
    
})

app.get('/users/:id', async (req: Request, res: Response) => {
    
})

app.delete('/users/:id', async (req: Request, res: Response) => {
    
});

let server = app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

server.on('SIGTERM', () => {

});