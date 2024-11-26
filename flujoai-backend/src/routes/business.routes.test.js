const request = require('supertest');
const express = require('express');
const { Business } = require('../models/associations');
const businessController = require('../controllers/business.controller');

// Crear una app Express para testing
const app = express();
app.use(express.json());

// Mock del modelo Business
jest.mock('../models/associations', () => ({
  Business: {
    create: jest.fn().mockImplementation((data) => {
      if (!data.name) {
        throw new Error('Invalid data');
      }
      return Promise.resolve({
        id: 1,
        name: data.name,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        toJSON() {
          return {
            id: this.id,
            name: this.name
          };
        }
      });
    }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('POST /api/business', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if name is missing', async () => {
    const invalidBusiness = {};

    const req = {
      body: invalidBusiness
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await businessController.createBusiness(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid data'
    });
  });
});

