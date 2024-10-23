const { createUser } = require('./user.controller');
const { User } = require('../models/associations');

// Mock de la función create de Sequelize
jest.mock('../models/associations', () => ({
  User: {
    create: jest.fn(),
  },
}));

describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a new user and return 201 status', async () => {
      const req = {
        body: {
          username: 'john_doe',
          email: 'john@example.com',
          password: 'securepassword123',
          business_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Simular el valor de retorno de la función create
      User.create.mockResolvedValue({ id: 1, ...req.body });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if data is invalid', async () => {
      const req = {
        body: {
          username: '',
          email: 'not-an-email',
          password: '123',
          business_id: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });
});
