import { Request, Response } from 'express';
import { ScrubsFileRepo } from '../repository/scrubs.file.repo';
import { ScrubsController } from './scrubs.controller';

describe('Given the scrubsController', () => {
  const mockRepo: ScrubsFileRepo = {
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
  const controller = new ScrubsController(mockRepo);

  describe('When getAll is called', () => {
    test('Then it should call resp.json', async () => {
      await controller.getAll(req, resp, next);
      expect(mockRepo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When getAll returns an error', () => {
    test('Then it should call next', async () => {
      (mockRepo.query as jest.Mock).mockRejectedValue(new Error(''));
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When getById is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.getById(req, resp, next);
      expect(mockRepo.queryById).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When getById returns an error', () => {
    test('Then it should call next', async () => {
      (mockRepo.queryById as jest.Mock).mockRejectedValue(new Error(''));
      await controller.getById(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When post is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.post(req, resp, next);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When post is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockRepo.create as jest.Mock).mockRejectedValue(new Error(''));
      await controller.post(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.patch(req, resp, next);
      expect(mockRepo.update).toHaveBeenCalled();
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
      expect(mockRepo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockRepo.update as jest.Mock).mockRejectedValue(new Error(''));
      await controller.patch(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When delete is called and return data', () => {
    test('Then it should call resp.json', async () => {
      await controller.delete(req, resp, next);
      expect(mockRepo.destroy).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When patch is called and return error', () => {
    test('Then it should call resp.json', async () => {
      (mockRepo.destroy as jest.Mock).mockRejectedValue(new Error(''));
      await controller.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
