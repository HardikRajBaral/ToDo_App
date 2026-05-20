import express, { NextFunction,Request,Response } from 'express';
import userRouter from './user/userRouter';
import globalErrorHandler from './middleware/globalmiddleware';
import { HttpError } from 'http-errors';
import todoRouter from './todo/todoRouter';

const app = express();

app.use(express.json());

app.use('/api/users',userRouter)
app.use('/api/todos',todoRouter)

app.use((err: HttpError | null, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

export default app;