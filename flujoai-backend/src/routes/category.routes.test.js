const request = require('supertest');
const express = require('express');
const { Category } = require('../models/associations');
const categoryController = require('../controllers/category.controller');

// Crear una app Express para testing
const app = express();
app.use(express.json());

// Configurar las rutas
app.post('/api/category', categoryController.createCategory);

// Mock del modelo Category
jest.mock('../models/associations', () => ({
  Category: {
    create: jest.fn().mockImplementation((data) => {
      const createdCategory = {
        id: 1,
        name: data.name,
        description: data.description,
        business_id: data.business_id,
        createdAt: new Date(),
        updatedAt: new Date(),
        dataValues: {
          id: 1,
          name: data.name,
          description: data.description,
          business_id: data.business_id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };
      return Promise.resolve(createdCategory);
    }),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('POST /api/category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new category', async () => {
    const newCategory = {
      name: 'Test Category',
      description: 'Test Description'
    };

    const req = {
      body: newCategory,
      user: { business_id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await categoryController.createCategory(req, res);

    const expectedResponse = {
      id: 1,
      name: 'Test Category',
      description: 'Test Description',
      business_id: 1,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    };

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
  });

  it('should return 400 if data is invalid', async () => {
    const invalidCategory = {
      description: 'Missing name'
    };

    const req = {
      body: invalidCategory,
      user: { business_id: 1 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await categoryController.createCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Nombre y descripción son requeridos'
    });
  });
});
