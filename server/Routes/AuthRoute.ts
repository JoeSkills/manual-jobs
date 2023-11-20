import {
  Signup,
  Login,
  userVerification,
  adminSecretKeyVerification,
  UpdateUser,
} from '../Controllers/AuthController';
import express from 'express';
import ImageUploadMiddleware from '../Middlewares/ImageUploadMiddleware';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login', Login);

router.post('/', userVerification);

router.post('/admin-key-verification', adminSecretKeyVerification);

router.patch('/update-user/:id', ImageUploadMiddleware, UpdateUser);

export default router;
