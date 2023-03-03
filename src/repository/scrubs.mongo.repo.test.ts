import { mockScrub, mockScrubPartial } from '../mocks/test.mocks.js';
import { Scrub } from '../entities/scrub.model.js';
import { ScrubsMongoRepo } from './scrubs.mongo.repo.js';
import { ScrubModel } from './scrubs.mongo.model.js';

jest.mock('./scrubs.mongo.model.js');

const repo = new ScrubsMongoRepo();

describe('Given the ScrubsMongoRepo', () => {
  describe('When instantiated', () => {
    test('Then it should be instance of class', () => {
      expect(repo).toBeInstanceOf(ScrubsMongoRepo);
    });
  });

  describe('When call the query method', () => {
    test('Then it should call the readFile function and return the data', async () => {
      (ScrubModel.find as jest.Mock).mockImplementation(() => ({
        populate: jest.fn().mockReturnValue([{ name: 'test' }]),
      }));
      const result = await repo.query();
      expect(ScrubModel.find).toHaveBeenCalled();
      expect(result).toEqual([{ name: 'test' }]);
    });
  });

  describe('When call the queryById method (ok)', () => {
    test('Then it should return the argument if it has a valid id', async () => {
      (ScrubModel.findById as jest.Mock).mockImplementation(() => ({
        populate: jest.fn().mockReturnValue({ name: 'test' }),
      }));

      const result = await repo.queryById('2');
      expect(ScrubModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ name: 'test' });
    });
  });

  describe('When call the queryById method (error)', () => {
    test('Then it should throw an error if it has not a valid id', () => {
      (ScrubModel.findById as jest.Mock).mockImplementation(() => ({
        populate: jest.fn().mockReturnValue(undefined),
      }));

      expect(async () => {
        await repo.queryById('1');
      }).rejects.toThrow();
      expect(ScrubModel.findById).toHaveBeenCalled();
    });
  });

  describe('When calling the search method (ok)', () => {
    test('Then it should return an array with the results', async () => {
      (ScrubModel.find as jest.Mock).mockResolvedValue([{ email: 'Test' }]);
      const result = await repo.search([
        { key: 'email', value: 'Test' },
        { key: 'test', value: 'test2' },
      ]);
      expect(result).toEqual([{ email: 'Test' }]);
    });
  });

  describe('When call the create method', () => {
    test('Then it should call model.create ', async () => {
      (ScrubModel.create as jest.Mock).mockResolvedValue([{ name: 'test' }]);
      const result = await repo.create(mockScrubPartial);
      expect(ScrubModel.create).toHaveBeenCalled();

      expect(result).toEqual([{ name: 'test' }]);
    });
  });

  describe('When call the create method (error)', () => {
    test('Then it should call model.create ', async () => {
      (ScrubModel.create as jest.Mock).mockResolvedValue(undefined);

      expect(ScrubModel.create).toHaveBeenCalled();

      expect(async () => {
        await repo.create(mockScrubPartial);
      }).rejects.toThrow();
    });
  });

  describe('When call the update method (ok)', () => {
    test('Then it should call readFile, writeFile and return the item updated', async () => {
      const value = [
        { id: '5', name: 'Test' },
        { id: '1', name: 'Test2' },
      ];
      (ScrubModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(value);
      const result = await repo.update(mockScrub);
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();

      expect(result).toEqual(value);
    });
  });

  describe('When call the update method without id (error)', () => {
    test('Then it should throw error', async () => {
      (ScrubModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(undefined);
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(ScrubModel.findByIdAndUpdate).toHaveBeenCalled();

      expect(async () => {
        await repo.update({ name: 'test' } as Scrub);
      }).rejects.toThrow();
    });
  });

  describe('When call the update destroy (ok)', () => {
    test('Then it should call readFile and writeFile', async () => {
      const value = '[{ "id": "5", "name": "Test" }]';
      (ScrubModel.findByIdAndDelete as jest.Mock).mockResolvedValue(value);
      await repo.destroy('5');
      expect(ScrubModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('When call the update destroy without items (error)', () => {
    test('Then it should throw an error', async () => {
      (ScrubModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      const result = repo.destroy('1');
      await expect(result).rejects.toThrow();
    });
  });
});
