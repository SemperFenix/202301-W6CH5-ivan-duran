import { Scrub } from '../entities/scrub.models';

export const mockScrubs: Scrub[] = [
  {
    id: 1,
    name: 'John D. Dorian',
    occupattion: 'doctor',
    personality: 'hugger',
    extend_perso: '',
    img: '',
  },
  {
    id: 2,
    name: 'Percyval U. Cox',
    occupattion: 'doctor',
    personality: 'absolute truth',
    extend_perso: '',
    img: '',
  },
];

export const mockScrub: Scrub = {
  id: 5,
  name: 'Bob Kelzo',
  occupattion: 'doctor',
  personality: 'bossy',
  extend_perso: '',
  img: '',
};

export const mockScrubPartial: Partial<Scrub> = {
  name: 'Test ok',
  occupattion: 'doctor',
  personality: 'bossy',
};
