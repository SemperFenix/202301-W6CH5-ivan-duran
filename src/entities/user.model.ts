import { Scrub } from './scrub.model.js';

export type User = {
  id: string;
  email: string;
  password: string;
  scrubs: Scrub[];
};
