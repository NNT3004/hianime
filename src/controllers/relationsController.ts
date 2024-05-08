import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Relation from '../models/Relation';

export const createRelation = async (req: Request, res: Response) => {
  const relation = await Relation.create(req.body);

  res.status(StatusCodes.OK).json({ relation });
};

export const updateRelation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const relation = await Relation.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ relation });
};

export const getRelation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { posts } = req.query;

  const query = Relation.findById(id);
  if (posts) query.populate('posts');

  const relation = await query;

  res.status(StatusCodes.OK).json({ relation });
};

export const getAllRelations = async (req: Request, res: Response) => {
  const { post } = req.query;

  const query = Relation.find();
  if (post) query.populate('post');

  const relations = await query;

  res.status(StatusCodes.OK).json({ relations });
};

export const deleteRelation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Relation.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
