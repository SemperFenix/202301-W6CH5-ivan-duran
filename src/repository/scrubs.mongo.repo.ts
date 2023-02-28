import { Scrub } from '../entities/scrub.model.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface.js';
import { ScrubModel } from './scrubs.mongo.model.js';
import createDebug from 'debug';

const debug = createDebug('W7B:mongoRepo');

export class ScrubsMongoRepo implements Repo<Scrub> {
  async query(): Promise<Scrub[]> {
    debug('Query');
    const data = await ScrubModel.find();
    return data;
  }

  async queryById(id: string): Promise<Scrub> {
    debug('QueryID');

    const data = await ScrubModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');

    return data;
  }

  async create(info: Partial<Scrub>): Promise<Scrub> {
    debug('Create');
    debug(ScrubModel);

    const data = await ScrubModel.create(info);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');

    return data;
  }

  async update(info: Scrub): Promise<Scrub> {
    // El método findByIdAndUpdate devuelve por defecto los datos anteriores, por eso le añadimos el modificador
    const data = await ScrubModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in update');
    debug('Update');

    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('Destroy');
    debug(id);
    debug(id.trim());
    const data = await ScrubModel.findByIdAndDelete(id.trim());
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }
}
