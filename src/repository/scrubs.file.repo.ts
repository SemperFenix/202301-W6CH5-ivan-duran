/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

export type Scrub = {
  name: string;
  occupattion: string;
  personality: string;
};

export interface ScrubsRepoStructure {
  read(): Promise<Scrub[]>;
  write(info: Scrub): Promise<string>;
}

const file = 'data/scrubs.json';

export class ScrubsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Scrub[]);
  }

  async write(info: Scrub) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: Scrub[] = JSON.parse(data);
    const finalData = JSON.stringify([...parsedData, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
    return 'Write successful';
  }
}
