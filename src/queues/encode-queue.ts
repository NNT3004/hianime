import { Queue, Worker } from 'bullmq';
import { encodeHLSWithMultipleVideoStreams } from '../utils/encode-hls';
import Episode from '../models/Episode';
import path from 'path';
import { Types } from 'mongoose';

const queueName = 'Encode';

const encodeQueue = new Queue(queueName, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const encodeWorker = new Worker(
  queueName,
  async (job) => {
    const episodeId: Types.ObjectId = job.data._id;
    const uniqueEpisodeId = episodeId.toString() + '-' + Date.now();
    await encodeHLSWithMultipleVideoStreams(
      job.data.path,
      path.join(__dirname, '..', '..', 'public', uniqueEpisodeId)
    );
    await Episode.updateOne(
      { _id: job.data._id },
      { path: `public/${uniqueEpisodeId}/master.m3u8` }
    );
  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }
);

export default encodeQueue;
