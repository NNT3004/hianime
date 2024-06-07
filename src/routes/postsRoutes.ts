import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getAllPosts,
  updatePost,
  getTopPosts,
  increaseView,
  getStats,
  getAllPostsByGenre,
} from '../controllers/postsController';

const router = express.Router();

router.route('/').get(getAllPosts);
router.route('/top').get(getTopPosts);
router.route('/stats').get(getStats);
router.route('/by-genre/:id').get(getAllPostsByGenre);
router.route('/:id').get(getPost);
router.route('/').post(createPost);
router.route('/:id').put(updatePost);
router.route('/:id').delete(deletePost);
router.route('/:id/watch').post(increaseView);

export default router;
