import express, { NextFunction,Request,Response } from 'express';
import userRouter from './src/user/userRouter';
import globalErrorHandler from './src/middleware/globalmiddleware';
import { HttpError } from 'http-errors';

const app = express();

app.use(express.json());

app.use('/api/users',userRouter)


app.use((err: HttpError | null, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

export default app;