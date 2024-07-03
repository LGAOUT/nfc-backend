import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: (err as any).message });
  }
};

export const loginWithPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // Issued at time
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
    };

    const token = jwt.sign(payload, 'your_jwt_secret');

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: (err as any).message });
  }
};

export const loginWithHash = async (req: Request, res: Response) => {
  const { email, hash } = req.body;
  try {
    const user = await User.findOne({ email, hash });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or hash.' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // Issued at time
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
    };

    const token = jwt.sign(payload, 'your_jwt_secret');

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: (err as any).message });
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route', user: req.user });
};

export const getUserProfile = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, email, role, hash } = req.user as IUser;
  res.json({ name, email, role, hash });
};
