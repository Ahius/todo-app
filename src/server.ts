import express, { Request, Response } from 'express';
import connectToDatabase from './db';


const aplication = express();
const PORT = 1337;

connectToDatabase();


aplication.get('/ping', (request: Request, respone: Response) => {
    respone.send('Pong')
});

aplication.listen(PORT, () => {
    console.log('Server up and running');
    
})

