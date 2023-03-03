import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';

export type TokenPayload = {
  id: string;
  email: string;
  role: string;
};

const salt = 10;

export class Auth {
  static createToken(payload: TokenPayload) {
    return jwt.sign(payload, config.secret as string);
  }

  static checkAndReturnToken(token: string) {
    if (!config.secret) return;
    const verify = jwt.verify(token, config.secret);
    if (typeof verify === 'string') {
      throw new Error('Invalid token');
    }

    return verify as TokenPayload;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
