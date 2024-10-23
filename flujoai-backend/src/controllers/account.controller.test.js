const { createAccount } = require('./account.controller');
const { Account } = require('../models/associations');

// Mock de la función create de Sequelize
jest.mock('../models/associations', () => ({
  Account: {
    create: jest.fn(),
  },
}));

describe('Account Controller', () => {
  describe('createAccount', () => {
    it('should create a new account and return 201 status', async () => {
      const req = {
        body: {
          name: 'Savings Account',
          description: 'Personal savings account',
          business_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.create.mockResolvedValue({ id: 1, ...req.body });

      await createAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if name or business_id is missing', async () => {
      const req = {
        body: {
          name: '',
          description: 'Personal savings account',
          business_id: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });
});

