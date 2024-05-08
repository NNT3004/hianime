import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
  const post = await Post.create(req.body);

  res.status(StatusCodes.OK).json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ post });
};

export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { studio, relation } = req.query;

  const query = Post.findById(id);
  if (studio) query.populate('studio');
  if (relation) query.populate({ path: 'relation', populate: 'posts' });

  const post = await query;

  res.status(StatusCodes.OK).json({ post });
};

export const getPosts = async (req: Request, res: Response) => {
  const { studio, relation } = req.query;

  const query = Post.find();
  if (studio) query.populate('studio');
  if (relation) query.populate('relation');

  const posts = await query;

  res.status(StatusCodes.OK).json({ posts });
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
