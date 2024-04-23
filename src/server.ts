import express, { Request, Response } from 'express';
import connectToDatabase from './db';
import userRoutes from '../routes/user.routes';


const aplication = express();
aplication.use(express.json());
const PORT = 1337;

connectToDatabase();


aplication.get('/ping', (request: Request, respone: Response) => {
    respone.send('Pong')
});

aplication.use("/user", userRoutes);



aplication.listen(PORT, () => {
    console.log('Server up and running');
    
})

