import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../models/Rating';

export const createRating = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post, score } = req.body;

  const rating = await Rating.create({ user, post, score });

  res.status(StatusCodes.OK).json({ rating });
};

export const getAllRatings = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const ratings = await Rating.find({ user });

  res.status(StatusCodes.OK).json({ ratings });
};

export const updateRating = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post, score } = req.body;

  const rating = await Rating.updateOne(
    { user, post },
    { score },
    {
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ rating });
};

export const deleteRating = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;

  const result = await Rating.deleteOne({ user, post });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
