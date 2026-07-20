import user from '../../database/models/user/user.model.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 * 24 * 7,
  });
};

const userCreateByRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bycrpt.genSalt(10);
    const hashPassword = await bycrpt.hash(password, salt);
    const newUser = new user({
      userName: userName || email.split('@')[0],
      email,
      password: hashPassword,
    });

    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET || 'supersecretkeyforinterviewiqapplication2026';
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '7d' });
    setCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.userName,
        email: newUser.email,
        role: 'user',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message || error,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ email }).select('+password');

    const isPasswordValid = await bycrpt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'supersecretkeyforinterviewiqapplication2026';
    const token = jwt.sign({ id: existingUser._id }, jwtSecret, { expiresIn: '7d' });
    setCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      user: {
        id: existingUser._id,
        name: existingUser.userName || existingUser.displayName || existingUser.email.split('@')[0],
        email: existingUser.email,
        role: 'user',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in user',
      error: error.message || error,
    });
  }
};

export default userCreateByRegister;