import { User } from '../entities/user.model.js';
import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface.js';
import { UserModel } from './users.mongo.model.js';
import createDebug from 'debug';

const debug = createDebug('W7B:UsersRepo');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Instantiated...');
  }

  async query(): Promise<User[]> {
    debug('Query');
    return [];
  }

  async queryById(id: string): Promise<User> {
    debug('QueryID');

    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  // Método vacío para extender en el futuro
  async search(query: { key: string; value: unknown }[]): Promise<User[]> {
    debug('Searching...');
    const preQuery = query.map((item) => ({ [item.key]: item.value }));

    const myQuery = preQuery.reduce((obj, item) => ({ ...obj, ...item }));
    const data = await UserModel.find({ ...myQuery });

    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('Create');

    const data = await UserModel.create(info);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');

    return data;
  }

  async update(info: User): Promise<User> {
    // El método findByIdAndUpdate devuelve por defecto los datos anteriores, por eso le añadimos el modificador
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
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
    const data = await UserModel.findByIdAndDelete(id.trim());
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }
}
