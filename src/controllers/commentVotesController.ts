import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CommentVote from '../models/CommentVote';
import Comment from '../models/Comment';

export const createCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;
  const { isUpvote } = req.body;

  const prevVote = await CommentVote.findOneAndUpdate(
    { user, comment },
    { isUpvote },
    {
      runValidators: true,
      upsert: true,
    }
  );
  const voteCounts = {} as any;
  if (prevVote && prevVote.isUpvote === true) {
    if (!isUpvote) {
      voteCounts.upvote = -1;
      voteCounts.devote = 1;
    }
  } else if (prevVote && prevVote.isUpvote === false) {
    if (isUpvote) {
      voteCounts.upvote = 1;
      voteCounts.devote = -1;
    }
  } else {
    if (isUpvote) {
      voteCounts.upvote = 1;
    } else {
      voteCounts.devote = 1;
    }
  }

  await Comment.updateOne({ _id: comment }, { $inc: voteCounts });

  res.status(StatusCodes.OK).json({});
};

export const deleteCommentVote = async (req: Request, res: Response) => {
  const user = req.user.userId;
  const { comment } = req.query;

  const preVote = await CommentVote.findOneAndDelete({ user, comment });

  if (preVote && preVote.isUpvote) {
    await Comment.updateOne({ _id: comment }, { $inc: { upvote: -1 } });
  } else if (preVote) {
    await Comment.updateOne({ _id: comment }, { $inc: { devote: -1 } });
  } else {
    throw new BadRequestError('making each day of the year');
  }

  res.status(StatusCodes.OK).json({});
};
