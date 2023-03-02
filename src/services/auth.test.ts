import { Auth, TokenPayload } from './auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../config');

describe('Given the Auth class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When called the sign method with correct payload', () => {
    test('Then it should call the jwt.sign', () => {
      Auth.signJWT({ a: 'test' } as unknown as TokenPayload);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });

  describe('When called the sign verify with correct data', () => {
    test('Then it should call the jwt.verify', () => {
      (jwt.verify as jest.Mock).mockReturnValue({ a: 'test' });

      Auth.verifyJWT('a');
      expect(jwt.verify).toHaveBeenCalled();
    });
  });

  describe('When called the verify with incorrect data', () => {
    test('Then it should throw error', () => {
      (jwt.verify as jest.Mock).mockReturnValue('a');
      expect(() => Auth.verifyJWT('a')).toThrow();
    });
  });

  describe('When called the hash with correct data', () => {
    test('Then it should call the bcrypt.hash', () => {
      Auth.hash('a');
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });

  describe('When called the compare with correct data', () => {
    test('Then it should call the bcrypt.compare', () => {
      Auth.compare('a', 'b');
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  });

  describe('When called the sign method with no config.secret', () => {
    test('Then it should return', () => {
      delete config.secret;
      Auth.signJWT({ a: 'test' } as unknown as TokenPayload);

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('When called the verify method with no config.secret', () => {
    test('Then it should return', () => {
      delete config.secret;

      Auth.verifyJWT('a');

      expect(jwt.verify).not.toHaveBeenCalled();
    });
  });
});
