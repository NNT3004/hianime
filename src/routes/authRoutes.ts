import express from 'express';
import {
  register,
  login,
  updateUser,
  getUser,
  changePassword,
  uploadAvatar,
} from '../controllers/authController';
import authenticateUser from '../middlewares/auth';
import withImage from '../middlewares/with-image';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update-user').post(authenticateUser, updateUser);
router.route('/get-user').get(authenticateUser, getUser);
router.route('/avatar').post(authenticateUser, withImage, uploadAvatar);
router.route('/change-password').post(authenticateUser, changePassword);

export default router;
