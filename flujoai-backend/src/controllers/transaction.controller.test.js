const { createTransaction } = require('./transaction.controller');
const { Transaction } = require('../models/associations');

// Mock de la función create de Sequelize
jest.mock('../models/associations', () => ({
  Transaction: {
    create: jest.fn(),
  },
}));

describe('Transaction Controller', () => {
  describe('createTransaction', () => {
    it('should create a new transaction and return 201 status', async () => {
      const req = {
        body: {
          amount: 100,
          date: '2023-10-01',
          type: 'income',
          account_id: 1,
          category_id: 1,
          description: 'Salary',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Transaction.create.mockResolvedValue({ id: 1, ...req.body });

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if amount is less than or equal to 0', async () => {
      const req = {
        body: {
          amount: 0,
          date: '2023-10-01',
          type: 'income',
          account_id: 1,
          category_id: 1,
          description: 'Salary',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'El monto debe ser mayor a 0' });
    });
  });
});

