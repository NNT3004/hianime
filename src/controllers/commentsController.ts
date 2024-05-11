import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Comment from '../models/Comment';

export const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ comment });
};

export const createComment = async (req: Request, res: Response) => {
  const comment = await Comment.create(req.body);

  res.status(StatusCodes.OK).json({ comment });
};

export const getAllComments = async (req: Request, res: Response) => {
  const { episode, page } = req.query;

  let pageN = 0;
  if (typeof page === 'string') {
    pageN = Number.parseInt(page) || 0;
  }

  const limit = 10;

  const [result] = await Comment.aggregate([
    {
      $match: { episode, toComment: { $exists: false } },
    },
    {
      $facet: {
        paginatedResults: [
          {
            $skip: (pageN - 1) * limit,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'toComment',
              as: 'replies',
            },
          },
          {
            $addFields: {
              hasReply: { $gt: [{ $size: '$replies' }, 0] },
            },
          },
        ],
        totalCount: [{ $count: 'total' }],
      },
    },
  ]);

  const comments = result.paginatedResults;
  const totalCount =
    result.totalCount.length > 0 ? result.totalCount[0].total : 0;
  const totalPages = Math.floor(totalCount / limit) + 1;

  res.status(StatusCodes.OK).json({ comments, curPage: pageN, totalPages });
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await Comment.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(StatusCodes.OK).json({ comment });
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Comment.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
