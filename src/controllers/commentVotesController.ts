import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentVote from '../models/CommentVote';

export const createCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { isUpvote, comment } = req.body;

  const commentVote = await CommentVote.create({ user, comment, isUpvote });
  res.status(StatusCodes.OK).json({ commentVote });
};

export const updateCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;
  const { isUpvote } = req.body;

  const commentVote = await CommentVote.findOneAndUpdate(
    { user, comment },
    { isUpvote },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ commentVote });
};

export const deleteCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;

  const result = await CommentVote.deleteOne({ user, comment });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};

export const getAllCommentsVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { episode } = req.query;

  const commentVotes = await CommentVote.find({
    user,
    'comment.episode': episode,
  }).select('-user');
};
