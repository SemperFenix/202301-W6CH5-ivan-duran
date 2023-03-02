import { Request, Response } from 'express';
import { ScrubsMongoRepo } from '../repository/scrubs.mongo.repo';
import { UsersMongoRepo } from '../repository/users.mongo.repo';
import { ScrubsController } from './scrubs.controller';

describe('Given the scrubsController', () => {
  const mockScrubRepo: ScrubsMongoRepo = {
    query: jest.fn(),
    queryById: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };
  const mockUserRepo: UsersMongoRepo = {
    query: jest.fn(),
    queryById: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };
  const req = {
    body: {},
    params: {
      id: '3',
    },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();
  const controller = new ScrubsController(mockScrubRepo, mockUserRepo);

  describe('When getAll is called', () => {
    test('Then it should call resp.json', async () => {
      await controller.getAll(req, resp, next);
      expect(mockScrubRepo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When getAll returns an error', () => {
    test('Then it should call next', async () => {
      (mockScrubRepo.query as jest.Mock).mockRejectedValue(new Error(''));
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When getById is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.getById(req, resp, next);
      expect(mockScrubRepo.queryById).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When getById returns an error', () => {
    test('Then it should call next', async () => {
      (mockScrubRepo.queryById as jest.Mock).mockRejectedValue(new Error(''));
      await controller.getById(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When post is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.post(req, resp, next);
      expect(mockScrubRepo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When post is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockScrubRepo.create as jest.Mock).mockRejectedValue(new Error(''));
      await controller.post(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.patch(req, resp, next);
      expect(mockScrubRepo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return data', () => {
    test('Then it should call resp.json', async () => {
      req.body.id = '2';
      const req2 = {
        body: {},
        params: {},
      } as unknown as Request;
      await controller.patch(req2, resp, next);
      expect(mockScrubRepo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockScrubRepo.update as jest.Mock).mockRejectedValue(new Error(''));
      await controller.patch(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When delete is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.delete(req, resp, next);
      expect(mockScrubRepo.destroy).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockScrubRepo.destroy as jest.Mock).mockRejectedValue(new Error(''));
      await controller.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
