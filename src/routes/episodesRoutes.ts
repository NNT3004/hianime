import express from 'express';
import {
  createEpisode,
  getEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
} from '../controllers/episodesController';

const router = express.Router();

router.route('/:id').get(getEpisode);
router.route('/').get(getAllEpisodes);
router.route('/').post(createEpisode);
router.route('/:id').put(updateEpisode);
router.route('/:id').delete(deleteEpisode);

export default router;
