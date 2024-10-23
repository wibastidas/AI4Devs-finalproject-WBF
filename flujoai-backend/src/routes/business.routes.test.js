const request = require('supertest');
const app = require('../../src/app');
const { Business } = require('../../src/models/associations');

// Mocking de las funciones de Sequelize
jest.mock('../../src/models/associations', () => ({
  Business: {
    create: jest.fn(),
  },
}));

describe('POST /api/business', () => {
  it('should create a new business', async () => {
    const newBusiness = {
      name: 'Tech Corp',
      description: 'Technology company',
    };

    // Simular la respuesta de la función create
    Business.create.mockResolvedValue({ id: 1, ...newBusiness });

    const response = await request(app)
      .post('/api/business')
      .send(newBusiness);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newBusiness.name);
  });

  it('should return 400 if data is invalid', async () => {
    const invalidBusiness = {
      name: '',
      description: 'Technology company',
    };

    // Simular un error de validación
    Business.create.mockRejectedValue(new Error('Validation error'));

    const response = await request(app)
      .post('/api/business')
      .send(invalidBusiness);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

