import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postsController';

const router = express.Router();

router.route('/:id').get(getPost);
router.route('/').get(getPosts);
router.route('/').post(createPost);
router.route('/:id').put(updatePost);
router.route('/:id').delete(deletePost);

export default router;
