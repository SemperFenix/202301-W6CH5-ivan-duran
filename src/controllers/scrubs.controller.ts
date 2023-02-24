import { Request, Response } from 'express';
import { ScrubsRepoStructure } from '../repository/scrubs.file.repo.js';

export class ScrubsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: ScrubsRepoStructure) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => resp.json(data));
  }

  create(req: Request, _resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then((data) => console.log(data));
  }
}
