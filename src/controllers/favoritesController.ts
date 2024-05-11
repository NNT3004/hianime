import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Favorite from '../models/Favorite';

export const createFavorite = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.body;
  if (!post) throw new BadRequestError('post is missing');

  const favorite = await Favorite.create({ user, post });

  res.status(StatusCodes.OK).json({ favorite });
};

export const getAllFavorites = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const favorites = await Favorite.find({ user });

  res.status(StatusCodes.OK).json({ favorites });
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const user = req.user.userId;

  const { post } = req.query;
  if (!post) throw new BadRequestError('post is missing');

  const result = await Favorite.deleteOne({ user, post });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
