import { Scrub } from './scrub.model';

export type User = {
  id: string;
  email: string;
  password: string;
  scrubs: Scrub[];
};
