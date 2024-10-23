const request = require('supertest');
const app = require('../../src/app');
const { Category } = require('../../src/models/associations');

// Mocking de las funciones de Sequelize
jest.mock('../../src/models/associations', () => ({
  Category: {
    create: jest.fn(),
  },
}));

describe('POST /api/category', () => {
  it('should create a new category', async () => {
    const newCategory = {
      name: 'Utilities',
      description: 'Monthly utility bills',
      business_id: 1,
    };

    // Simular la respuesta de la función create
    Category.create.mockResolvedValue({ id: 1, ...newCategory });

    const response = await request(app)
      .post('/api/category')
      .send(newCategory);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newCategory.name);
  });

  it('should return 400 if data is invalid', async () => {
    const invalidCategory = {
      name: '',
      description: 'Monthly utility bills',
      business_id: null,
    };

    // Simular un error de validación
    Category.create.mockRejectedValue(new Error('Validation error'));

    const response = await request(app)
      .post('/api/category')
      .send(invalidCategory);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
