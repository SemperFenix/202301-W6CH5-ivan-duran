import { NextFunction, Response, Request } from 'express';
import { HTTPError } from '../errors/errors.js';
import { Auth, TokenPayload } from '../services/auth.js';

export interface CustomRequest extends Request {
  info?: TokenPayload;
}

export function logged(req: CustomRequest, resp: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader)
      throw new HTTPError(
        498,
        'Token expired/invalid',
        'No authorization header found'
      );

    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(
        498,
        'Token expired/invalid',
        'No Bearer in auth header'
      );

    const token = authHeader.slice(7);
    const tokenPayload = Auth.checkAndReturnToken(token);
    req.info = tokenPayload;
    next();
  } catch (error) {
    next(error);
  }
}
