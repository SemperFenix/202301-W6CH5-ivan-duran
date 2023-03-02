import { NextFunction, Request, Response } from 'express';
import { Scrub } from '../entities/scrub.model.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { CustomRequest } from '../interceptors/logged.js';
import { HTTPError } from '../errors/errors.js';
import { User } from '../entities/user.model.js';

const debug = createDebug('W7B:scrubsController');

export class ScrubsController {
  // eslint-disable-next-line no-unused-vars
  constructor(public scrubRepo: Repo<Scrub>, public userRepo: Repo<User>) {
    debug('Instantiated');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GetAll trying...');
      const data = await this.scrubRepo.query();
      resp.json({ results: data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GetById trying...');

      const data = await this.scrubRepo.queryById(req.params.id);

      if (data === undefined) resp.json({ results: [] });
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error getting ID');
      next(error);
    }
  }

  async post(req: CustomRequest, resp: Response, next: NextFunction) {
    try {
      debug('Post trying...');

      const userId = req.info?.id;

      if (!userId) throw new HTTPError(404, 'Not found', 'No user id');

      const actualUser = await this.userRepo.queryById(userId);
      req.body.owner = actualUser;
      const newScrub = await this.scrubRepo.create(req.body);

      actualUser.scrubs = [...actualUser.scrubs, newScrub];
      await this.userRepo.update(actualUser);
      resp.json({ results: [newScrub] });
    } catch (error) {
      debug('Error posting');

      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Patch trying...');

      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.scrubRepo.update(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error patching');

      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Delete trying...');

      await this.scrubRepo.destroy(req.params.id);
      resp.json({ results: [] });
    } catch (error) {
      debug('Error deleting');

      next(error);
    }
  }
}
