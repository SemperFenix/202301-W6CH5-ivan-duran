import { Request, Response } from 'express';
import { ScrubsRepoStructure } from '../repository/scrubs.file.repo.js';

export class ScrubsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: ScrubsRepoStructure) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => resp.json(data));
  }

  get(req: Request, resp: Response) {
    this.repo
      .readOne(Number(req.params.id))
      .then((data) =>
        data === undefined
          ? resp.send('<p>No elements found with the requested id</p>')
          : resp.json(data)
      );
  }

  create(req: Request, resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then((data) => console.log(data));
    resp.send('<h1>Write Successful</h1>');
  }

  // Prueba de concepto del método update
  // async update(req: Request, resp: Response) {
  //   const updateInfo = req.body
  //   const data = await this.repo.read()

  // }
}
