import {
  Signup,
  Login,
  userVerification,
  adminSecretKeyVerification,
  UpdateUser,
} from '../Controllers/AuthController';
import express from 'express';
import DocsUploadMiddleware from '../Middlewares/DocsUploadMiddleware';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login', Login);

router.post('/', userVerification);

router.post('/admin-key-verification', adminSecretKeyVerification);

router.patch('/update-user/:id', DocsUploadMiddleware, UpdateUser);

export default router;
