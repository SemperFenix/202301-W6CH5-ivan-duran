import { NextFunction, Request, Response } from 'express';
import { Scrub } from '../entities/scrub.model.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';

const debug = createDebug('W6B:controller');

export class ScrubsController {
  // eslint-disable-next-line no-unused-vars
  constructor(public repo: Repo<Scrub>) {
    debug('Instantiated');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GetAll trying...');
      const data = await this.repo.query();
      resp.json({ results: data });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GetById trying...');

      const data = await this.repo.queryById(req.params.id);

      if (data === undefined) resp.json({ results: [] });
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error getting ID');
      next(error);
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Post trying...');

      console.log(req.body);
      const data = await this.repo.create(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error posting');

      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Patch trying...');

      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      debug('Error patching');

      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Delete trying...');

      await this.repo.destroy(req.params.id);
      resp.json({ results: [] });
    } catch (error) {
      debug('Error deleting');

      next(error);
    }
  }
}
