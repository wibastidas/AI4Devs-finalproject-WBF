const { createUser, login } = require('./user.controller');
const { User, Business } = require('../models/associations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');

// Mocks
jest.mock('../config/database', () => ({
  transaction: jest.fn(() => ({
    commit: jest.fn(),
    rollback: jest.fn()
  }))
}));

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
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user with business successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        toJSON: () => ({
          id: 1,
          username: 'testuser',
          email: 'test@test.com',
          password: 'hashedpass'
        })
      };

      const mockBusiness = {
        id: 1,
        name: "testuser's Business"
      };

      bcrypt.hash.mockResolvedValue('hashedpass');
      Business.create.mockResolvedValue(mockBusiness);
      User.create.mockResolvedValue(mockUser);

      const req = {
        body: {
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        business: {
          id: 1,
          name: "testuser's Business"
        }
      }));
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: '$2b$10$hashedpassword',  // Asegurarse que empiece con $2b$ para bcrypt
        username: 'testuser',
        Business: {
          id: 1,
          name: "testuser's Business"
        }
      };

      // Configurar los mocks correctamente
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocktoken');

      const req = {
        body: {
          email: 'test@test.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      // Verificar que findOne fue llamado con los parámetros correctos
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
        include: [{
          model: Business,
          attributes: ['id', 'name']
        }]
      });

      // Verificar que bcrypt.compare fue llamado correctamente
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);

      // Verificar la respuesta
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: 'mocktoken',
        user: {
          id: 1,
          email: 'test@test.com',
          username: 'testuser',
          business: {
            id: 1,
            name: "testuser's Business"
          }
        }
      });
    });

    it('should return 401 for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const req = {
        body: {
          email: 'wrong@email.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });
});
