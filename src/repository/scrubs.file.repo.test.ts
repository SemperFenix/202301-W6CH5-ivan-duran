import { ScrubsFileRepo } from './scrubs.file.repo';
import fs from 'fs/promises';
import { mockScrub, mockScrubPartial } from '../mocks/test.mocks';
import { Scrub } from '../entities/scrub.models';

jest.mock('fs/promises');
describe('Given the ScrubsFileRepo', () => {
  const repo = new ScrubsFileRepo();

  describe('When instantiated', () => {
    test('Then it should be instance of class', () => {
      expect(repo).toBeInstanceOf(ScrubsFileRepo);
    });
  });

  describe('When call the query method', () => {
    test('Then it should call the readFile function and return the data', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"name":"test"}]');
      const result = await repo.query();
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([{ name: 'test' }]);
    });
  });

  describe('When call the readOne method (ok)', () => {
    test('Then it should return the argument if it has a valid id', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id":2}]');

      const result = await repo.queryById(2);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: 2 });
    });
  });

  describe('When call the readOne method (error)', () => {
    test('Then it should throw an error if it has not a valid id', () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"name":"test"}]');

      expect(fs.readFile).toHaveBeenCalled();
      expect(async () => {
        await repo.queryById(2);
      }).rejects.toThrow();
    });
  });

  describe('When call the create method', () => {
    test('Then it should call readFile, writeFile and return the', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[{"name":"test"}]');
      const result = await repo.create(mockScrubPartial);
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();

      expect(result).toEqual({ ...mockScrubPartial, id: 1 });
    });
  });

  describe('When call the update method (ok)', () => {
    test('Then it should call readFile, writeFile and return the item updated', async () => {
      const value = [
        { id: 5, name: 'Test' },
        { id: 1, name: 'Test2' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(value));
      const result = await repo.update(mockScrub);
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();

      expect(result).toEqual(mockScrub);
    });
  });

  describe('When call the update method without id (error)', () => {
    test('Then it should throw error', async () => {
      const value = [
        { id: 5, name: 'Test' },
        { id: 1, name: 'Test2' },
      ];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(value));
      const result = repo.update({ name: 'test' } as Scrub);
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();

      await expect(result).rejects.toThrow();
    });
  });

  describe('When call the update destroy (ok)', () => {
    test('Then it should call readFile and writeFile', async () => {
      const value = [{ id: 5, name: 'Test' }];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(value));
      await repo.destroy(5);
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });

  describe('When call the update destroy without items (error)', () => {
    test('Then it should throw an error', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      const result = repo.destroy(5);
      await expect(result).rejects.toThrow();
    });
  });
});
