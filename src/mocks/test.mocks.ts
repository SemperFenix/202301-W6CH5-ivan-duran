import { Scrub } from '../entities/scrub.model';

export const mockScrubs: Scrub[] = [
  {
    id: '1',
    name: 'John D. Dorian',
    occupattion: 'doctor',
    personality: 'hugger',
    extendPerso: '',
    img: '',
  },
  {
    id: '2',
    name: 'Percyval U. Cox',
    occupattion: 'doctor',
    personality: 'absolute truth',
    extendPerso: '',
    img: '',
  },
];

export const mockScrub: Scrub = {
  id: '5',
  name: 'Bob Kelzo',
  occupattion: 'doctor',
  personality: 'bossy',
  extendPerso: '',
  img: '',
};

export const mockScrubPartial: Partial<Scrub> = {
  name: 'Test ok',
  occupattion: 'doctor',
  personality: 'bossy',
};
