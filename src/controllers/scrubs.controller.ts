import { NextFunction, Request, Response } from 'express';
import { Scrub } from '../entities/scrub.models.js';
import { Repo } from '../repository/repo.interface.js';

export class ScrubsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: Repo<Scrub>) {}

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.query();
      resp.json({ results: data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.queryById(Number(req.params.id));

      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const data = await this.repo.create(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      req.body.id = req.body.id ? req.body.id : req.params.id;
      const data = await this.repo.update(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      await this.repo.destroy(Number(req.params.id));
      console.log('Delete successful');
      resp.json({ results: [] });
    } catch (error) {
      next(error);
    }
  }
}
