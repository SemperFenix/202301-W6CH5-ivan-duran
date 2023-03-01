import { mockUser, mockUserPartial } from '../mocks/test.mocks.js';
import { User } from '../entities/user.model.js';
import { UsersMongoRepo } from './users.mongo.repo.js';
import { UserModel } from './users.mongo.model.js';

jest.mock('./users.mongo.model.js');
describe('Given the UsersMongoRepo', () => {
  const repo = new UsersMongoRepo();

  describe('When instantiated', () => {
    test('Then it should be instance of class', () => {
      expect(repo).toBeInstanceOf(UsersMongoRepo);
    });
  });

  describe('When call the query method', () => {
    test('Then it should call the readFile function and return the data', async () => {
      (UserModel.find as unknown as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();
      expect(result).toEqual([]);
    });
  });

  describe('When call the queryById method (ok)', () => {
    test('Then it should return the argument if it has a valid id', async () => {
      (UserModel.findById as unknown as jest.Mock).mockResolvedValue([
        { id: '2' },
      ]);

      const result = await repo.queryById('2');
      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toEqual([{ id: '2' }]);
    });
  });

  describe('When call the queryById method (error)', () => {
    test('Then it should throw an error if it has not a valid id', () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(undefined);
      expect(async () => {
        await repo.queryById('1');
      }).rejects.toThrow();
      expect(UserModel.findById).toHaveBeenCalled();
    });
  });

  describe('When calling the search method (ok)', () => {
    test('Then it should return an array with the results', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue([{ email: 'Test' }]);
      const result = await repo.search([{ key: 'email', value: 'Test' }]);
      expect(result).toEqual([{ email: 'Test' }]);
    });
  });

  describe('When call the create method', () => {
    test('Then it should call model.create ', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue([{ name: 'test' }]);
      const result = await repo.create(mockUserPartial);
      expect(UserModel.create).toHaveBeenCalled();

      expect(result).toEqual([{ name: 'test' }]);
    });
  });

  describe('When call the create method (error)', () => {
    test('Then it should call model.create ', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue(undefined);

      expect(UserModel.create).toHaveBeenCalled();

      expect(async () => {
        await repo.create(mockUserPartial);
      }).rejects.toThrow();
    });
  });

  describe('When call the update method (ok)', () => {
    test('Then it should call readFile, writeFile and return the item updated', async () => {
      const value = [
        { id: '5', name: 'Test' },
        { id: '1', name: 'Test2' },
      ];
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(value);
      const result = await repo.update(mockUser);
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();

      expect(result).toEqual(value);
    });
  });

  describe('When call the update method without id (error)', () => {
    test('Then it should throw error', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(undefined);
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();

      expect(async () => {
        await repo.update({ name: 'test' } as unknown as User);
      }).rejects.toThrow();
    });
  });

  describe('When call the update destroy (ok)', () => {
    test('Then it should call readFile and writeFile', async () => {
      const value = '[{ "id": "5", "name": "Test" }]';
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(value);
      await repo.destroy('5');
      expect(UserModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('When call the update destroy without items (error)', () => {
    test('Then it should throw an error', async () => {
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      const result = repo.destroy('1');
      await expect(result).rejects.toThrow();
    });
  });
});
