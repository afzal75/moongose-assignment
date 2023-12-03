import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome again !');
});

app.use('/api/users', UserRoutes);

export default app;
