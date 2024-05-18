import express from 'express';
import {
  register,
  login,
  updateUser,
  getUser,
} from '../controllers/authController';
import authenticateUser from '../middlewares/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update-user').post(authenticateUser, updateUser);
router.route('/get-user').get(authenticateUser, getUser);

export default router;
