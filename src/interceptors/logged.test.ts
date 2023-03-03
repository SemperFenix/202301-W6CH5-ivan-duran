import { NextFunction, Response } from 'express';
import { Auth, TokenPayload } from '../services/auth';
import { CustomRequest, logged } from './logged';
jest.mock('../services/auth.js');

const mockReq = {
  get: jest.fn(),
} as unknown as CustomRequest;
const mockResp = {} as Response;
const next = jest.fn() as NextFunction;

describe('Given the logged middleware function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('When called with correct parameters', () => {
    test('Then it should call next function', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Bearer test');
      (Auth.checkAndReturnToken as jest.Mock).mockResolvedValue({
        id: 'Test',
      } as TokenPayload);
      logged(mockReq, mockResp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When called with no Authorization header', () => {
    test('Then it should call next function (error)', () => {
      (mockReq.get as jest.Mock).mockReturnValue(undefined);

      logged(mockReq, mockResp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When Authorization header not start with "Bearer"', () => {
    test('Then it should call next function (error)', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Test token');

      logged(mockReq, mockResp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
