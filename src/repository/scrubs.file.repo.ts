/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

export type Scrub = {
  id: number;
  name: string;
  occupattion: string;
  personality: string;
};

export interface ScrubsRepoStructure {
  read(): Promise<Scrub[]>;
  readOne(id: Scrub['id']): Promise<Scrub>;
  write(info: Scrub): Promise<void>;
  update(info: Scrub): Promise<void>;
  delete(info: Scrub['id']): Promise<void>;
}

const file = 'data/scrubs.json';

export class ScrubsFileRepo implements ScrubsRepoStructure {
  // El método read está hecho con then para utilizar los dos tipos de estructura de resolución de promesas.
  read() {
    return fs
      .readFile(file, 'utf-8')
      .then((data) => JSON.parse(data) as Scrub[]);
  }

  async readOne(id: Scrub['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    return parsedData.filter((item) => item.id === id)[0];
  }

  async write(info: Scrub) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    const newID: number = Math.max(...parsedData.map((item) => item.id));
    info.id = newID + 1;
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, 'utf-8');
  }

  async update(info: Scrub) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    const finalData = JSON.stringify(
      parsedData.map((item) => (item.id === info.id ? info : item))
    );
    await fs.writeFile(file, finalData, 'utf-8');
  }

  async delete(id: Scrub['id']) {
    const data = await fs.readFile(file, 'utf-8');
    const parsedData: Scrub[] = JSON.parse(data);
    const finalData = JSON.stringify(
      parsedData.filter((item) => item.id !== id)
    );
    await fs.writeFile(file, finalData, 'utf-8');
  }
}
