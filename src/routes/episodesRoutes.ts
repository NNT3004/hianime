import express from 'express';
import {
  createEpisode,
  getEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
  getEpisodes,
} from '../controllers/episodesController';
import withVideo from '../middlewares/with-video';

const router = express.Router();

router.route('/').get(getAllEpisodes);
router.route('/').post(withVideo, createEpisode);
router.route('/watch').get(getEpisodes);
router.route('/:id').get(getEpisode);
router.route('/:id').put(withVideo, updateEpisode);
router.route('/:id').delete(deleteEpisode);

export default router;
