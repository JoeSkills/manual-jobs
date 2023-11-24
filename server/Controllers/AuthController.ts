import User from '../Models/UserModel';
import { createSecretToken } from '../utils/SecretToken';
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const Signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, username, createdAt, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    const user = new User({
      email,
      password: await bcrypt.hash(password, 12),
      username,
      createdAt,
      role,
    });
    const token = createSecretToken(user._id);
    await user.save();
    res.status(201).json({
      message: 'User signed in successfully',
      success: true,
      user,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message, success: false });
  }
};

export const Login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const token = createSecretToken(user._id);

    res.status(201).json({
      message: 'User logged in successfully',
      success: true,
      user,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: (error as Error).message, success: false });
  }
};

export const userVerification: RequestHandler = (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.json({ status: false });
    }
    jwt.verify(
      token,
      process.env.TOKEN_KEY as string,
      async (err: any, data: any) => {
        if (err) {
          return res.status(404).json({ status: false });
        } else {
          const user = await User.findById(data.id);
          if (user)
            return res.status(200).json({ status: true, user: user.username });
          else return res.status(404).json({ status: false });
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: (error as Error).message, status: false });
  }
};
export const adminSecretKeyVerification: RequestHandler = (req, res) => {
  try {
    const secretKey = req.body.secretKey;
    if (!secretKey) return res.status(400).json({ status: false });

    if (secretKey !== process.env.ADMIN_SECRET_KEY)
      return res.status(400).json({
        status: false,
        message: 'Please input the correct admin secret key',
      });

    return res.status(200).json({
      status: true,
      message: 'Admin secret key successfully verified',
    });
  } catch (error) {
    res.status(404).json({ message: (error as Error).message, status: false });
  }
};

export const UpdateUser: RequestHandler = async (req: any, res, next) => {
  try {
    const { phoneNumber, gender } = req.body;
    const userImg = req.files && req.files[0] && req.files[0].filename;
    const userDocs = req.files && req.files[1] && req.files[1].filename;

    if (!phoneNumber && !userImg && !gender)
      return res.status(400).json({
        status: false,
        message: 'Updates can only be carried out with the proper values',
      });

    if (req.files && req.files[0] && req.files[0].filename)
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          userImg,
        }
      );

    if (req.files && req.files[1] && req.files[1].filename)
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          userDocs,
        }
      );

    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        phoneNumber,
        gender,
      }
    );

    await user?.save();

    return res
      .status(200)
      .json({ message: 'User Data Updated Successfully', status: true, user });

    next();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message, status: false });
  }
};

export const AcceptUser: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const user = await User.findOneAndUpdate(
      { _id },
      {
        accepted: true,
      }
    );

    await user?.save();

    return res
      .status(200)
      .json({ message: 'User Data Updated Successfully', status: true, user });

    next();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message, status: false });
  }
};

export const GetAuthData: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: 'Successfully retrieved all users',
      users,
      status: true,
    });
    next();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message, status: false });
  }
};
