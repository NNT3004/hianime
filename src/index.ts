import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

// allow throw error to middleware
import 'express-async-errors';

// router
import authRouter from './routes/authRoutes';
import studiosRouter from './routes/studiosRoutes';
import postsRouter from './routes/postsRoutes';
import relationsRouter from './routes/relationRoutes';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundMiddleWare from './middlewares/not-found';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/studios', studiosRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/relations', relationsRouter);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

import connectDB from './db/connect';

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await connectDB(String(process.env.MONGO_URL));
    app.listen(port, () => {
      console.log('Listening');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
