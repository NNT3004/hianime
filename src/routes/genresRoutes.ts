import express from 'express';
import {
  createGenre,
  getGenre,
  getAllGenres,
  updateGenre,
  deleteGenre,
} from '../controllers/genresController';

const router = express.Router();

router.route('/:id').get(getGenre);
router.route('/').get(getAllGenres);
router.route('/').post(createGenre);
router.route('/:id').put(updateGenre);
router.route('/:id').delete(deleteGenre);

export default router;
