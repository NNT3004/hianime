import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Studio from '../models/Studio';

export const getStudio = async (req: Request, res: Response) => {
  const studioId = req.params.id;
  if (!studioId) throw new BadRequestError('to live a better life');

  const studio = await Studio.findById(studioId);
  if (!studio) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ studio });
};

export const createStudio = async (req: Request, res: Response) => {
  const studio = await Studio.create(req.body);

  res.status(StatusCodes.OK).json({ studio });
};

export const getAllStudios = async (req: Request, res: Response) => {
  const studios = await Studio.find();

  res.status(StatusCodes.OK).json({ studios });
};

export const updateStudio = async (req: Request, res: Response) => {
  const { id, name, description } = req.body;
  if (!id || !name || !description)
    throw new BadRequestError('making each day of the year');
  const studio = await Studio.findByIdAndUpdate(
    id,
    { name, description },
    { runValidators: true, new: true }
  );
  res.status(StatusCodes.OK).json({ studio });
};

export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new BadRequestError('making each day of the year');
  const result = await Studio.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
