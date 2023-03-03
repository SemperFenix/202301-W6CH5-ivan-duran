import { User } from './user.model.js';

export type Scrub = {
  id: string;
  img: string;
  name: string;
  occupattion: string;
  personality: string;
  extendPerso: string;
  owner: User;
};
