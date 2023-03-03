import { Request, Response } from 'express';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';
import { Auth } from '../services/auth.js';
import { UsersController } from './users.controller.js';

jest.mock('../services/auth.js');
jest.mock('../config.js', () => ({
  _dirname: 'test',
  config: {
    secret: 'test',
  },
}));

describe('Given the scrubsController', () => {
  const mockRepo = {
    search: jest.fn(),

    create: jest.fn(),
  } as unknown as UsersMongoRepo;

  const req = {
    body: {},
  } as unknown as Request;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();
  const controller = new UsersController(mockRepo);

  describe('When register is called', () => {
    test('Then it should return the created user', async () => {
      req.body = {
        email: 'Test',
        password: 'testp',
      };
      await controller.register(req, resp, next);
      expect(Auth.hash).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When register is called without email or password in the body', () => {
    test('Then it should call next', async () => {
      req.body = {
        password: '',
      };
      await controller.register(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('When login is called with correct data', () => {
    test('Then it should call resp.json', async () => {
      (Auth.compare as jest.Mock).mockResolvedValue(true);
      req.body = {
        email: 'Test',
        password: 'test',
      };

      (mockRepo.search as jest.Mock).mockResolvedValue([
        { email: 'Test', password: 'test' },
      ]);
      (Auth.compare as jest.Mock).mockResolvedValue(true);

      await controller.login(req, resp, next);

      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When login is called without email or password in the body', () => {
    test('Then it should call next', async () => {
      req.body = {
        password: 'Test',
      };
      (Auth.compare as jest.Mock).mockResolvedValue(true);
      (mockRepo.search as jest.Mock).mockResolvedValue([
        { email: 'Test', password: 'test' },
      ]);
      await controller.login(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('When login is called and search not find items', () => {
    test('Then it should call next', async () => {
      req.body = {
        email: 'Test',
        password: 'Test',
      };
      (mockRepo.search as jest.Mock).mockResolvedValue([]);

      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When login is called and Auth.compare returns false', () => {
    test('Then it should call next', async () => {
      req.body = {
        email: 'Test',
        password: 'Test',
      };

      (mockRepo.search as jest.Mock).mockResolvedValue(['a']);

      (Auth.compare as jest.Mock).mockResolvedValue(false);

      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
