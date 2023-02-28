import { mockScrub, mockScrubPartial } from '../mocks/test.mocks.js';
import { Scrub } from '../entities/scrub.model.js';
import { ScrubsMongoRepo } from './scrubs.mongo.repo.js';
import { ScrubModel } from './scrubs.mongo.model.js';

jest.mock('./scrubs.mongo.model.js');
describe('Given the ScrubsMongoRepo', () => {
  const repo = new ScrubsMongoRepo();

  describe('When instantiated', () => {
    test('Then it should be instance of class', () => {
      expect(repo).toBeInstanceOf(ScrubsMongoRepo);
    });
  });

  describe('When call the query method', () => {
    test('Then it should call the readFile function and return the data', async () => {
      (ScrubModel.find as unknown as jest.Mock).mockResolvedValue(
        '[{"name":"test"}]'
      );
      const result = await repo.query();
      expect(ScrubModel.find).toHaveBeenCalled();
      expect(result).toEqual([{ name: 'test' }]);
    });
  });

  describe('When call the readOne method (ok)', () => {
    test('Then it should return the argument if it has a valid id', async () => {
      (ScrubModel.findById as unknown as jest.Mock).mockResolvedValue(
        '[{"id":"2"}]'
      );

      const result = await repo.queryById('2');
      expect(ScrubModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '2' });
    });
  });

  describe('When call the readOne method (error)', () => {
    test('Then it should throw an error if it has not a valid id', () => {
      (ScrubModel.findById as jest.Mock).mockResolvedValue('[{"name":"test"}]');

      expect(ScrubModel.findById).toHaveBeenCalled();
      expect(async () => {
        await repo.queryById('2');
      }).rejects.toThrow();
    });
  });

  describe('When call the create method', () => {
    test('Then it should call readFile, writeFile and return the', async () => {
      (ScrubModel.create as jest.Mock).mockResolvedValue('[{"name":"test"}]');
      const result = await repo.create(mockScrubPartial);
      expect(ScrubModel.create).toHaveBeenCalled();

      expect(result).toEqual({ ...mockScrubPartial });
    });
  });

  describe('When call the update method (ok)', () => {
    test('Then it should call readFile, writeFile and return the item updated', async () => {
      const value = [
        { id: '5', name: 'Test' },
        { id: '1', name: 'Test2' },
      ];
      (ScrubModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        JSON.stringify(value)
      );
      const result = await repo.update(mockScrub);
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();

      expect(result).toEqual(mockScrub);
    });
  });

  describe('When call the update method without id (error)', () => {
    test('Then it should throw error', async () => {
      const value = [
        { id: '5', name: 'Test' },
        { id: '1', name: 'Test2' },
      ];
      (ScrubModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        JSON.stringify(value)
      );
      const result = repo.update({ name: 'test' } as Scrub);
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();

      await expect(result).rejects.toThrow();
    });
  });

  describe('When call the update destroy (ok)', () => {
    test('Then it should call readFile and writeFile', async () => {
      const value = [{ id: '5', name: 'Test' }];
      (ScrubModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        JSON.stringify(value)
      );
      await repo.destroy('5');
      expect(ScrubModel.findByIdAndDelete).toHaveBeenCalled();
      expect(ScrubModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('When call the update destroy without items (error)', () => {
    test('Then it should throw an error', async () => {
      (ScrubModel.findByIdAndDelete as jest.Mock).mockResolvedValue('[]');
      const result = repo.destroy('5');
      await expect(result).rejects.toThrow();
    });
  });
});
