const { 
    getBalanceDistribution, 
    getIncomeExpensesByDate,
    getExpensesByCategory,
    getIncomesByCategory 
} = require('./dashboard.controller');
const { Transaction, Account, Category, AccountBalance } = require('../models/associations');

// Mock de las funciones de Sequelize
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
    describe('getBalanceDistribution', () => {
        it('should return balance distribution by accounts', async () => {
            const mockBalances = [
                {
                    account_id: 1,
                    current_balance: 50,
                    Account: {
                        name: 'Account 1'
                    }
                }
            ];

            AccountBalance.findAll.mockResolvedValue(mockBalances);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getBalanceDistribution(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                totalBalance: 50,
                distribution: [{
                    account_id: 1,
                    account_name: 'Account 1',
                    balance: 50
                }]
            });
        });
    });

    describe('getIncomeExpensesByDate', () => {
        it('should return income and expenses summary by date range', async () => {
            const mockTransactions = [{
                totalIncome: 100,
                totalExpenses: 50
            }];

            Transaction.findAll.mockResolvedValue(mockTransactions);

            const req = {
                query: {
                    startDate: '2024-01-01',
                    endDate: '2024-01-31'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getIncomeExpensesByDate(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                summary: {
                    monthlyIncome: 100,
                    monthlyExpenses: 50
                },
                analysis: {
                    currentMargin: 50,
                    marginRate: 50,
                    status: {
                        type: 'success',
                        message: 'Balance positivo del 50.0% este período'
                    }
                }
            });
        });
    });

    describe('getExpensesByCategory', () => {
        it('should return expenses grouped by category', async () => {
            const mockExpenses = [
                { 
                    amount: 50,
                    Category: { name: 'Food' }
                },
                {
                    amount: 30,
                    Category: { name: 'Transport' }
                }
            ];

            Transaction.findAll.mockResolvedValue(mockExpenses);

            const req = {
                query: {
                    startDate: '2024-01-01',
                    endDate: '2024-01-31'
                }
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
                    'Food': 50,
                    'Transport': 30
                }
            });
        });
    });

    describe('getIncomesByCategory', () => {
        it('should return incomes grouped by category', async () => {
            const mockIncomes = [
                {
                    amount: 100,
                    Category: { name: 'Sales' }
                },
                {
                    amount: 50,
                    Category: { name: 'Services' }
                }
            ];

            Transaction.findAll.mockResolvedValue(mockIncomes);

            const req = {
                query: {
                    startDate: '2024-01-01',
                    endDate: '2024-01-31'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getIncomesByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ok: true,
                incomesByCategory: {
                    'Sales': 100,
                    'Services': 50
                }
            });
        });
    });
}); 