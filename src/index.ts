import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

// socket
import { Server } from 'socket.io';
import { createServer } from 'node:http';
const server = createServer(app);
export const io = new Server(server);

import jwt, { JwtPayload } from 'jsonwebtoken';

io.on('connection', (socket) => {
  const authHeader = socket.handshake.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return;
  }
  const token = authHeader.split(' ')[1];
  if (token) {
    return;
  }
  try {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    socket.join(decoded.role);
  } catch (error) {
    return;
  }
});

// allow throw error to middleware
import 'express-async-errors';

// router
import authRouter from './routes/authRoutes';
import studiosRouter from './routes/studiosRoutes';
import postsRouter from './routes/postsRoutes';
import groupsRouter from './routes/groupsRoutes';
import episodesRouter from './routes/episodesRoutes';
import genresRouter from './routes/genresRoutes';
import postGenresRouter from './routes/postGenresRoutes';
import historiesRouter from './routes/historiesRoutes';
import ratingsRouter from './routes/ratingsRoutes';
import favoritesRouter from './routes/favoritesRoutes';
import commentsRouter from './routes/commentsRoutes';
import commentVotesRouter from './routes/commentVotesRoutes';
import usersRouter from './routes/usersRoutes';
import imagesRouter from './routes/imagesRoutes';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFoundMiddleWare from './middlewares/not-found';
import path from 'path';

// auth middleware
import authenticateUser from './middlewares/auth.js';

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/studios', studiosRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/groups', groupsRouter);
app.use('/api/v1/episodes', episodesRouter);
app.use('/api/v1/genres', genresRouter);
app.use('/api/v1/post-genres', postGenresRouter);
app.use('/api/v1/histories', authenticateUser, historiesRouter);
app.use('/api/v1/ratings', ratingsRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/comment-votes', commentVotesRouter);
app.use('/api/v1/favorites', authenticateUser, favoritesRouter);
app.use('/api/v1/users', authenticateUser, usersRouter);
app.use('/api/v1/images', imagesRouter);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

import connectDB from './db/connect';

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await connectDB(String(process.env.MONGO_URL));
    server.listen(port, () => {
      console.log('Listening');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
