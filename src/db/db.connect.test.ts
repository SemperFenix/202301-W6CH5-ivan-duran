import { dbConnect } from './db.connect';
import mongoose from 'mongoose';

jest.mock('mongoose');
describe('Given the dbconnect function', () => {
  dbConnect();

  describe('When called', () => {
    test('Then it should call the mongoose.connect', () => {
      expect(mongoose.connect).toHaveBeenCalled();
    });
  });
});
