import { Request, Response } from 'express';
import { Scrub, ScrubsRepoStructure } from '../repository/scrubs.file.repo.js';

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
    this.repo.write(req.body).then();
    resp.send('<h1>Write Successful</h1>');
  }

  // Los métodos update y delete están hechos con async para utilizar ambas formas de resolver promesas

  async update(req: Request, resp: Response) {
    const updateInfo = req.body as Partial<Scrub>;
    const dataToUpdate = await this.repo.readOne(Number(req.params.id));
    const updatedItem = Object.assign(dataToUpdate, updateInfo);
    console.log(updatedItem);
    await this.repo.update(updatedItem);
    console.log('Data updated: ' + updatedItem);
    resp.send('<h1>Update Sucessful<h2>');
  }

  async delete(req: Request, resp: Response) {
    await this.repo.delete(Number(req.params.id));
    resp.send(`<h1>Delete of item with id: ${req.params.id} successful`);
  }
}
