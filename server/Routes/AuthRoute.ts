import {
  Signup,
  Login,
  userVerification,
  adminSecretKeyVerification,
} from '../Controllers/AuthController';
import express from 'express';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login', Login);

router.post('/', userVerification);

router.post('/admin-key-verification', adminSecretKeyVerification);

export default router;
