import {
  Signup,
  Login,
  userVerification,
  adminSecretKeyVerification,
  UpdateUser,
  GetAuthData,
} from '../Controllers/AuthController';
import express from 'express';
import DocsUploadMiddleware from '../Middlewares/DocsUploadMiddleware';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login', Login);

router.post('/', userVerification);

router.post('/admin-key-verification', adminSecretKeyVerification);

router.patch('/update-user/:id', DocsUploadMiddleware, UpdateUser);

router.get('/', GetAuthData);

export default router;
