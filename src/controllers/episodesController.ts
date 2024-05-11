import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Episode from '../models/Episode';

export const getEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;

  const episode = await Episode.findById(id);
  if (!episode) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ episode });
};

export const createEpisode = async (req: Request, res: Response) => {
  const episode = await Episode.create(req.body);

  res.status(StatusCodes.OK).json({ episode });
};

export const getAllEpisodes = async (req: Request, res: Response) => {
  const { post } = req.query;

  const episodes = await Episode.find({ post }).sort('index');

  res.status(StatusCodes.OK).json({ episodes });
};

export const updateEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;

  const episode = await Episode.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json({ episode });
};

export const deleteEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const result = await Episode.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
