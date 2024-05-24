import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import History from '../models/History';

export const getHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  if (post) {
    const history = await History.findOne({ user, post });
    if (history) {
      res.status(StatusCodes.OK).json({
        history: { episode: history.episode, position: history.position },
      });
    } else {
      res.status(StatusCodes.OK).json({
        history: null,
      });
    }
  } else {
    const histories = await History.find({ user }).sort('createdAt');
    res.status(StatusCodes.OK).json({ histories });
  }
};

export const updateHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  const { episode, position } = req.body;

  if (!post) throw new BadRequestError('missng post');

  await History.updateOne(
    { user, post },
    { user, post, episode, position },
    { upsert: true }
  );

  res.status(StatusCodes.OK).json();
};

export const deleteHistory = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('missng post');

  const result = await History.deleteOne({ user, post });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
