import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
    name: string;
    _id: Types.ObjectId;
  },
  secret: string,
  expiresIn: string,
) => {
  const options = { expiresIn };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
