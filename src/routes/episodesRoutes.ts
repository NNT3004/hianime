import express from 'express';
import {
  createEpisode,
  getEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
} from '../controllers/episodesController';
import withVideo from '../middlewares/with-video';

const router = express.Router();

router.route('/:id').get(getEpisode);
router.route('/').get(getAllEpisodes);
router.route('/').post(withVideo, createEpisode);
router.route('/:id').put(withVideo, updateEpisode);
router.route('/:id').delete(deleteEpisode);

export default router;
