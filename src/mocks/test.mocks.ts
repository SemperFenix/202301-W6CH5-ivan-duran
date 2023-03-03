import { Scrub } from '../entities/scrub.model.js';
import { User } from '../entities/user.model.js';

export const mockScrubs: Scrub[] = [
  {
    id: '1',
    name: 'John D. Dorian',
    occupattion: 'doctor',
    personality: 'hugger',
    extendPerso: '',
    img: '',
    owner: {} as User,
  },
  {
    id: '2',
    name: 'Percyval U. Cox',
    occupattion: 'doctor',
    personality: 'absolute truth',
    extendPerso: '',
    img: '',
    owner: {} as User,
  },
];

export const mockScrub: Scrub = {
  id: '5',
  name: 'Bob Kelzo',
  occupattion: 'doctor',
  personality: 'bossy',
  extendPerso: '',
  img: '',
  owner: {} as User,
};

export const mockScrubPartial: Partial<Scrub> = {
  name: 'Test ok',
  occupattion: 'doctor',
  personality: 'bossy',
};

export const mockUser: User = {
  id: '1',
  email: 'test',
  password: '1234',
  scrubs: [],
};

export const mockUserPartial: Partial<User> = {
  email: 'test',
};
