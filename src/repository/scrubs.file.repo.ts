import fs from 'fs/promises';
import { Scrub } from '../entities/scrub.model';
import { Repo } from './repo.interface';

const file = 'data/scrubs.json';

export class ScrubsFileRepo implements Repo<Scrub> {
  async query() {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  }

  async queryById(id: Scrub['id']): Promise<Scrub> {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    const finalData = parsedData.find((item) => item.id === id);
    if (!finalData) throw new Error('Id not found');
    return finalData;
  }

  async create(info: Partial<Scrub>): Promise<Scrub> {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    // La asignaci'on de id la hara la DB
    // info.id = Math.max(...parsedData.map((item) => item.id)) + 1;
    // if (isNaN(info.id)) info.id = 1;
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, 'utf-8');
    await fs.readFile(file, 'utf-8');
    // Esto falla, pero no lo vamos a resolver de momento porque en BBDD no tendremos este problema. Lo resolvemos con aserción de tipo
    return info as Scrub;
  }

  async update(info: Partial<Scrub>): Promise<Scrub> {
    if (!info.id) throw new Error('Not valid data');
    const data = await fs.readFile(file, 'utf-8');
    console.log(data);
    const parsedData: Scrub[] = JSON.parse(data);
    console.log(parsedData);
    let updatedItem: Scrub = {} as Scrub;

    const finalData = JSON.stringify(
      parsedData.map((item) => {
        if (item.id === info.id) {
          updatedItem = { ...item, ...info };
          return updatedItem;
        }

        return item;
      })
    );

    await fs.writeFile(file, finalData, 'utf-8');

    return updatedItem;
  }

  async destroy(id: Scrub['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    const index = parsedData.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Id not found');
    parsedData.splice(index, 1);
    const finalData = JSON.stringify(parsedData);
    await fs.writeFile(file, finalData, 'utf-8');
  }
}
