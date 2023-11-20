import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './Routes/AuthRoute';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log('MongoDB is  connected successfully'))
    .catch((err) => console.error(err));
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://manual-jobs.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth/', authRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
