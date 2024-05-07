import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';

export const register = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('some field is not provided');

  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user) throw new UnauthenticatedError('email or password is incorrect');

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError('email or password is incorrect');

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.user!.userId, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ user });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.userId);
  res.status(StatusCodes.OK).json({ user });
};
