const { createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount } = require('./account.controller');
const { Account } = require('../models/associations');

// Mock de las funciones de Sequelize
jest.mock('../models/associations', () => ({
  Account: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
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

    it('should return 400 if data is invalid', async () => {
      const req = {
        body: {
          name: '',
          balance: null,
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

  describe('getAllAccounts', () => {
    it('should return all accounts', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAccounts = [
        { id: 1, name: 'Savings Account', balance: 1000 },
        { id: 2, name: 'Checking Account', balance: 500 },
      ];

      Account.findAll.mockResolvedValue(mockAccounts);

      await getAllAccounts({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAccounts);
    });
  });

  describe('getAccountById', () => {
    it('should return an account by ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAccount = { id: 1, name: 'Savings Account', balance: 1000 };

      Account.findByPk.mockResolvedValue(mockAccount);

      await getAccountById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAccount);
    });

    it('should return 404 if account not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.findByPk.mockResolvedValue(null);

      await getAccountById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Account not found' });
    });
  });

  describe('updateAccount', () => {
    it('should update an account', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Updated Savings Account', balance: 1500 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.update.mockResolvedValue([1]); // Indica que una fila fue actualizada
      Account.findByPk.mockResolvedValue({ id: 1, ...req.body });

      await updateAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 404 if account to update not found', async () => {
      const req = {
        params: { id: 9999 },
        body: { name: 'Non-existent Account' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.update.mockResolvedValue([0]); // Indica que ninguna fila fue actualizada

      await updateAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Account not found' });
    });
  });

  describe('deleteAccount', () => {
    it('should delete an account', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.destroy.mockResolvedValue(1); // Indica que una fila fue eliminada

      await deleteAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return 404 if account to delete not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Account.destroy.mockResolvedValue(0); // Indica que ninguna fila fue eliminada

      await deleteAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Account not found' });
    });
  });
});
