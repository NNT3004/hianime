import express from 'express';
import {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
  isFavorited,
} from '../controllers/favoritesController';

const router = express.Router();

router.route('/').get(getAllFavorites);
router.route('/').post(createFavorite);
router.route('/isFavorited').get(isFavorited);
router.route('/').delete(deleteFavorite);

export default router;
