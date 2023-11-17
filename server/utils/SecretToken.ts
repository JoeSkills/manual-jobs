import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();

export const createSecretToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY as string, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
