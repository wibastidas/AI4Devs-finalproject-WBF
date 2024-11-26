const { getBalanceDistribution, getIncomeExpensesByDate, getExpensesByCategory, getIncomesByCategory } = require('./dashboard.controller');
const { Transaction, Account, Category, AccountBalance } = require('../models/associations');

// Mock de los modelos
jest.mock('../models/associations', () => ({
  Transaction: {
    findAll: jest.fn(),
  },
  Account: {
    findAll: jest.fn(),
  },
  Category: {
    findAll: jest.fn(),
  },
  AccountBalance: {
    findAll: jest.fn(),
  }
}));

describe('Dashboard Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalanceDistribution', () => {
    it('should return balance distribution successfully', async () => {
      const mockBalances = [
        {
          account_id: 1,
          current_balance: 1000,
          Account: { name: 'Cuenta 1' }
        }
      ];

      AccountBalance.findAll.mockResolvedValue(mockBalances);

      const req = {
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getBalanceDistribution(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        totalBalance: 1000,
        distribution: [{
          account_id: 1,
          account_name: 'Cuenta 1',
          balance: 1000
        }]
      });
    });
  });

  describe('getIncomeExpensesByDate', () => {
    it('should return income and expenses summary', async () => {
      const mockTransactions = [{
        totalIncome: '2000',
        totalExpenses: '1000'
      }];

      Transaction.findAll.mockResolvedValue(mockTransactions);

      const req = {
        query: { startDate: '2024-01-01', endDate: '2024-01-31' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getIncomeExpensesByDate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        ok: true,
        summary: {
          monthlyIncome: 2000,
          monthlyExpenses: 1000
        }
      }));
    });
  });

  describe('getExpensesByCategory', () => {
    it('should return expenses grouped by category', async () => {
      const mockExpenses = [
        {
          category_id: 1,
          amount: 500,
          Category: { name: 'Categoría 1' }
        }
      ];

      Transaction.findAll.mockResolvedValue(mockExpenses);

      const req = {
        query: { startDate: '2024-01-01', endDate: '2024-01-31' },
        user: { business_id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getExpensesByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        expensesByCategory: {
          'Categoría 1': 500
        }
      });
    });
  });
}); 