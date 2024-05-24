import { NotFoundError } from '../errors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post';
import { Types } from 'mongoose';
import PostGenre from '../models/PostGenre';
import ViewCount from '../models/ViewCount';
import Episode from '../models/Episode';

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

  const { info } = req.query;

  if (info) {
    const post = await Post.findById(id).populate('studio');

    if (!post) throw new NotFoundError('post not found');

    const postGenres = await PostGenre.find({ post: id }).populate('genre');
    const episodeCount = await Episode.countDocuments({
      post: id,
      releaseDate: { $lt: new Date() },
    });
    const genres = postGenres.map((postGenre) => {
      return { _id: postGenre.genre._id, name: (postGenre.genre as any).name };
    });

    res
      .status(StatusCodes.OK)
      .json({ post: { ...post.toObject(), genres, episodeCount } });
  } else {
    const post = await Post.findById(id);

    if (!post) throw new NotFoundError('post not found');

    const postGenres = await PostGenre.find({ post: id }).select('-post');
    const genres = postGenres.map((postGenre) => postGenre.genre);
    const episodeCount = await Episode.countDocuments({
      post: id,
      releaseDate: { $lt: new Date() },
    });

    res
      .status(StatusCodes.OK)
      .json({ post: { ...post.toObject(), genres, episodeCount } });
  }
};

type SortOption = 'updated' | 'added' | 'name-asc' | 'name-desc' | 'release';
type TypeOption = 'all' | 'tv' | 'movie' | 'ona' | 'ova';
type StatusOption = 'all' | 'airing' | 'completed' | 'waiting';
type SeasonOption = 'all' | 'spring' | 'summer' | 'fall' | 'winter';
export const getAllPosts = async (req: Request, res: Response) => {
  let { sort, page, numPerPage, name, type, status, season, year } = req.query;

  const isValidSort = (value: any): value is SortOption =>
    ['updated', 'added', 'name-asc', 'name-desc', 'release'].includes(value);
  const isValidType = (value: any): value is TypeOption =>
    ['all', 'tv', 'movie', 'ona', 'ova'].includes(value);
  const isValidStatus = (value: any): value is StatusOption =>
    ['all', 'airing', 'completed', 'waiting'].includes(value);
  const isValidSeason = (value: any): value is SeasonOption =>
    ['all', 'spring', 'summer', 'fall', 'winter'].includes(value);

  const sortT: SortOption = isValidSort(sort) ? sort : 'updated';
  const typeT: TypeOption = isValidType(type) ? type : 'all';
  const statusT: StatusOption = isValidStatus(status) ? status : 'all';
  const seasonT: SeasonOption = isValidSeason(season) ? season : 'all';
  const nameT = (name as string) || '';
  const pageT = Number.parseInt(page as string) || 1;
  const numPerPageT = Number.parseInt(numPerPage as string) || 12;
  const yearT = Number.parseInt(year as string) || null;

  let order: any;
  switch (sortT) {
    case 'added':
      order = {
        created_at: 1,
      };
      break;
    case 'name-asc':
      order = {
        title: 1,
      };
      break;
    case 'name-desc':
      order = {
        title: -1,
      };
      break;
    case 'updated':
      order = {
        updated_at: 1,
      };
      break;
    case 'release':
      order = {
        airedFrom: 1,
      };
      break;
  }

  const match: any = {};

  if (yearT) {
    let startDate: Date, endDate: Date;
    if (seasonT != 'all') {
      startDate = new Date();
      startDate.setFullYear(yearT);
      switch (seasonT) {
        case 'spring':
          startDate.setMonth(2);
          break;
        case 'summer':
          startDate.setMonth(5);
          break;
        case 'fall':
          startDate.setMonth(8);
          break;
        case 'winter':
          startDate.setMonth(11);
          break;
      }
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 3);
    } else {
      startDate = new Date(yearT, 0, 1);
      endDate = new Date(yearT + 1, 0, 1);
    }
    match.airedFrom = { $gte: startDate, $lt: endDate };
  }

  if (typeT != 'all') match.type = typeT;
  if (statusT != 'all') match.status = statusT;
  if (nameT != '') {
    const nameRegex = new RegExp(nameT, 'i');
    match.title = { $regex: nameRegex };
  }
  const [result] = await Post.aggregate([
    {
      $match: match,
    },
    {
      $facet: {
        paginatedResults: [
          {
            $sort: order,
          },
          {
            $skip: (pageT - 1) * numPerPageT,
          },
          {
            $limit: numPerPageT,
          },
          {
            $lookup: {
              from: 'episodes',
              let: { post: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$post', '$$post'] },
                        { $lt: ['$releaseDate', new Date()] },
                      ],
                    },
                  },
                },
              ],
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
        ],
        totalCount: [{ $count: 'total' }],
      },
    },
  ]);

  const posts = result.paginatedResults;
  const totalCount =
    result.totalCount.length > 0 ? result.totalCount[0].total : 0;
  const totalPages = Math.floor(totalCount / numPerPageT) + 1;

  res.status(StatusCodes.OK).json({ posts, pageT, totalPages });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Post.deleteOne({ _id: id });

  if (result.deletedCount == 0)
    throw new NotFoundError('imagine there no heaven');

  res.status(StatusCodes.OK).json({ msg: 'deleted successfully' });
};

export const getTopPosts = async (req: Request, res: Response) => {
  const { ago, description, posterHorizonPath, posterVerticalPath } = req.query;

  let numDays = 0;
  if (typeof ago === 'string') {
    numDays = Number.parseInt(ago) || 0;
  }

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - numDays);

  const project: any = {
    _id: 1,
    title: 1,
    type: 1,
    duration: 1,
    episodeCount: 1,
    totalViews: 1,
    airedFrom: 1,
  };

  if (description) project.description = 1;
  if (posterHorizonPath) project.posterHorizonPath = 1;
  if (posterVerticalPath) project.posterVerticalPath = 1;

  const posts = await ViewCount.aggregate([
    {
      $match: {
        date: { $gte: fromDate.toISOString().split('T')[0] },
      },
    },
    {
      $group: {
        _id: '$post',
        totalViews: { $sum: '$count' },
      },
    },
    {
      $sort: { totalViews: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: '_id',
        as: 'postDetails',
      },
    },
    {
      $unwind: '$postDetails',
    },
    {
      $lookup: {
        from: 'episodes',
        let: { post: '$postDetails._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$post', '$$post'] },
                  { $lt: ['$releaseDate', new Date()] },
                ],
              },
            },
          },
        ],
        as: 'filteredEpisodes',
      },
    },
    {
      $addFields: {
        'postDetails.episodeCount': { $size: '$filteredEpisodes' },
      },
    },
    {
      $addFields: {
        postDetails: {
          $mergeObjects: ['$postDetails', { totalViews: '$totalViews' }],
        },
      },
    },
    {
      $project: {
        _id: 0,
        postDetails: 1,
      },
    },
    {
      $replaceRoot: { newRoot: '$postDetails' },
    },
    {
      $project: project,
    },
  ]);

  res.status(StatusCodes.OK).json({ posts });
};

export const increaseView = async (req: Request, res: Response) => {
  const { id } = req.params;

  await ViewCount.updateOne(
    {
      post: id,
      date: new Date().toISOString().split('T')[0],
    },
    { $inc: { count: 1 } },
    { upsert: true, setDefaultsOnInsert: true }
  );

  res.status(StatusCodes.OK).json();
};
