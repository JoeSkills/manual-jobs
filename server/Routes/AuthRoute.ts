import {
  Signup,
  Login,
  userVerification,
  adminSecretKeyVerification,
  UpdateUser,
  GetAuthData,
  DeleteUser,
  ToggleAcceptanceStatus,
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

router.patch('/acceptance-status/:id', ToggleAcceptanceStatus);

router.delete('/user/:id', DeleteUser);

export default router;
