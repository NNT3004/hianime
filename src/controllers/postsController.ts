import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post';
import { Types } from 'mongoose';
import PostGenre from '../models/PostGenre';

export const createPost = async (req: Request, res: Response) => {
  const body = Object.fromEntries(
    Object.entries(req.body).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    )
  );

  const post = await Post.create(body);

  const genres = body.genres as string[];
  const postGenres = genres.map((genre) => {
    return { post: post._id, genre };
  });

  await PostGenre.deleteMany({ post: post._id.toString() });
  await PostGenre.create(postGenres);

  res.status(StatusCodes.OK).json({ post: { ...post.toObject(), genres } });
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const body = Object.fromEntries(
    Object.entries(req.body).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ''
    )
  );

  const post = await Post.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
  });

  if (!post) throw new NotFoundError('post not found');

  const genres = body.genres as string[];
  const postGenres = genres.map((genre) => {
    return { post: post._id, genre };
  });

  await PostGenre.deleteMany({ post: post._id.toString() });
  await PostGenre.create(postGenres);

  res.status(StatusCodes.OK).json({ post: { ...post.toObject(), genres } });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) throw new NotFoundError('post not found');

  const postGenres = await PostGenre.find({ post: id }).select('-post');
  const genres = postGenres.map((postGenre) => postGenre.genre);

  res.status(StatusCodes.OK).json({ post: { ...post.toObject(), genres } });
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: 'episodes',
        localField: '_id',
        foreignField: 'post',
        as: 'episodes',
      },
    },
    {
      $addFields: {
        episodeCount: { $size: '$episodes' },
      },
    },
    {
      $project: {
        title: 1,
        posterVerticalPath: 1,
        duration: 1,
        episodeCount: 1,
        type: 1,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ posts });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
