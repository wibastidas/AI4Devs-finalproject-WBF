const { createUser, login } = require('../controllers/user.controller');
const { User, Business } = require('../models/associations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');

// Mock de sequelize
jest.mock('../config/database', () => ({
  transaction: jest.fn(() => ({
    commit: jest.fn().mockResolvedValue(),
    rollback: jest.fn().mockResolvedValue()
  }))
}));

// Mock de los modelos
jest.mock('../models/associations', () => ({
  User: {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn()
  },
  Business: {
    create: jest.fn()
  }
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token')
}));

describe('User Routes', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123'
      };

      const mockBusiness = {
        id: 1,
        name: "testuser's Business",
        toJSON: function() {
          return {
            id: this.id,
            name: this.name
          };
        }
      };

      const mockUser = {
        id: 1,
        ...newUser,
        business_id: 1,
        Business: mockBusiness,
        toJSON: function() {
          return {
            id: this.id,
            username: this.username,
            email: this.email,
            business: this.Business.toJSON()
          };
        }
      };

      Business.create.mockResolvedValue(mockBusiness);
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock-token');

      req = {
        body: newUser
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        business: {
          id: 1,
          name: "testuser's Business"
        }
      });
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidUser = {
        email: 'test@test.com'
      };

      req = {
        body: invalidUser
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid data'
      });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 401 with invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      req = {
        body: {
          email: 'wrong@test.com',
          password: 'wrongpassword'
        }
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid credentials'
      });
    });
  });
});