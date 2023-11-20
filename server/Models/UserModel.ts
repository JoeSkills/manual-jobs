import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  role: {
    type: String,
    required: [true, 'Your role is required'],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  userImg: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  userDocs: {
    type: String,
    required: false,
  },
});

export default mongoose.model('User', userSchema);
