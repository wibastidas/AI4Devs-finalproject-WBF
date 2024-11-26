const { createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount } = require('./account.controller');
const { Account } = require('../models/associations');
const sequelize = require('../config/database');

// Mocks
jest.mock('../config/database', () => ({
  transaction: jest.fn(() => ({
    commit: jest.fn(),
    rollback: jest.fn()
  }))
}));

jest.mock('../models/associations', () => ({
  Account: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Account Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    it('should create a new account', async () => {
      const mockAccount = {
        id: 1,
        name: 'Test Account',
        description: 'Test Description'
      };

      Account.create.mockResolvedValue(mockAccount);

      const req = {
        body: { name: 'Test Account', description: 'Test Description' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockAccount);
    });

    it('should return 400 if name is missing', async () => {
      const req = {
        body: { description: 'Test Description' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('getAllAccounts', () => {
    it('should return all accounts', async () => {
      const mockAccounts = [
        { id: 1, name: 'Account 1' },
        { id: 2, name: 'Account 2' }
      ];

      Account.findAll.mockResolvedValue(mockAccounts);

      const req = {
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllAccounts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAccounts);
    });
  });

  describe('getAccountById', () => {
    it('should return an account by ID', async () => {
      const mockAccount = { id: 1, name: 'Test Account' };

      Account.findOne.mockResolvedValue(mockAccount);

      const req = {
        params: { id: 1 },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAccountById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAccount);
    });

    it('should return 404 if account not found', async () => {
      Account.findOne.mockResolvedValue(null);

      const req = {
        params: { id: 999 },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAccountById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Account not found' });
    });
  });

  describe('updateAccount', () => {
    it('should update an account', async () => {
      const mockUpdated = [1];
      const mockAccount = { id: 1, name: 'Updated Account' };

      Account.update.mockResolvedValue(mockUpdated);
      Account.findOne.mockResolvedValue(mockAccount);

      const req = {
        params: { id: 1 },
        body: { name: 'Updated Account' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAccount);
    });

    it('should return 404 if account to update not found', async () => {
      Account.update.mockResolvedValue([0]);

      const req = {
        params: { id: 999 },
        body: { name: 'Updated Account' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Account not found' });
    });
  });

  describe('deleteAccount', () => {
    it('should delete an account', async () => {
      Account.destroy.mockResolvedValue(1);

      const req = {
        params: { id: 1 },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };

      await deleteAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
});
