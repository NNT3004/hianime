import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post';
import { Types } from 'mongoose';

export const createPost = async (req: Request, res: Response) => {
  const post = await Post.create(req.body);

  res.status(StatusCodes.OK).json({ post });
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ post });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'group',
        foreignField: 'group',
        as: 'group',
      },
    },
    {
      $sort: {
        airedFrom: 1,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ post });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const { studio } = req.query;

  const query = Post.find();
  if (studio) query.populate('studio');

  const posts = await query;

  res.status(StatusCodes.OK).json({ posts });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
