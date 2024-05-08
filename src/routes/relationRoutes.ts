import express from 'express';
import {
  createRelation,
  getRelation,
  getAllRelations,
  updateRelation,
  deleteRelation,
} from '../controllers/relationsController';

const router = express.Router();

router.route('/:id').get(getRelation);
router.route('/').get(getAllRelations);
router.route('/').post(createRelation);
router.route('/:id').put(updateRelation);
router.route('/:id').delete(deleteRelation);

export default router;
