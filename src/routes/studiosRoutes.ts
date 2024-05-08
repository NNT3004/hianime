import express from 'express';
import {
  createStudio,
  getStudio,
  getAllStudios,
  updateStudio,
  deleteStudio,
} from '../controllers/studiosController';
import authenticateUser from '../middlewares/auth';

const router = express.Router();

router.route('/:id').get(getStudio);
router.route('/').get(getAllStudios);
router.route('/').post(createStudio);
router.route('/:id').put(updateStudio);
router.route('/:id').delete(deleteStudio);

export default router;
