import { BadRequestError, NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Episode from '../models/Episode';
import encodeQueue from '../queues/encode-queue';
import { getVideoDuration } from '../utils/encode-hls';

export const getEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;

  const episode = await Episode.findById(id);
  if (!episode) throw new NotFoundError('i need my love to be here');

  res.status(StatusCodes.OK).json({ episode });
};

export const createEpisode = async (req: Request, res: Response) => {
  const video = req.file;
  if (!video) throw new BadRequestError('missing video');

  req.body.duration = await getVideoDuration(video.path);
  const episode = await Episode.create(req.body);

  encodeQueue.add(episode._id.toString(), {
    path: video.path,
    _id: episode._id,
  });
  res.status(StatusCodes.OK).json({ episode });
};

export const getAllEpisodes = async (req: Request, res: Response) => {
  const { post } = req.query;

  const episodes = await Episode.find({ post }).sort('index');

  res.status(StatusCodes.OK).json({ episodes });
};

export const updateEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;

  const video = req.file;
  if (video) {
    req.body.duration = await getVideoDuration(video.path);
    req.body.path = null;
  }

  const episode = await Episode.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (video && episode) {
    encodeQueue.add(episode._id.toString(), {
      path: video.path,
      _id: episode._id,
    });
  } else {
    throw new NotFoundError('episode not found');
  }

  res.status(StatusCodes.OK).json({ episode });
};

export const deleteEpisode = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await Episode.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new BadRequestError('making each day of the year');
  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};
