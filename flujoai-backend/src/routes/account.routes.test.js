const request = require('supertest');
const express = require('express');
const { Account } = require('../models/associations');
const accountController = require('../controllers/account.controller');

// Crear una app Express para testing
const app = express();
app.use(express.json());

// Mock del modelo Account
jest.mock('../models/associations', () => ({
  Account: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('POST /api/account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if data is invalid', async () => {
    const invalidAccount = {
      type: 'savings'
      // Falta el nombre y el balance
    };

    const req = {
      body: invalidAccount,
      user: { business_id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await accountController.createAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid data'
    });
  });
});
