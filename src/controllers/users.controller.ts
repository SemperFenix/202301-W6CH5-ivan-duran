import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.model.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { HTTPError } from '../errors/errors.js';
import { Auth } from '../services/auth.js';

const debug = createDebug('W7B:usersController');

export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(public repo: Repo<User>) {
    debug('Instantiated');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Register new user...');

      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      req.body.password = await Auth.hash(req.body.password);
      const data = await this.repo.create(req.body);

      resp.status(201);
      debug('Register successful...');
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error in register =(');
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Logging in...');
      const { email, password } = req.body;
      if (!email || !password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      const data = await this.repo.search([
        {
          key: 'email',
          value: email,
        },
      ]);
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      if (!(await Auth.compare(password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      const token = Auth.signJWT(email) as string;
      debug('Login sucessful!');
      resp.json({ results: [{ token }] });
    } catch (error) {
      debug('Error login');

      next(error);
    }
  }
}
