import express from 'express';
import userRouter from './src/user/userRouter';
import globalErrorHandler from './src/middleware/globalmiddleware';

const app = express();

app.use(express.json());

app.use('/api/users',userRouter)


app.use(globalErrorHandler);

export default app;