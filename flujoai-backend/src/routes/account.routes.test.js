const request = require('supertest');
const app = require('../../src/app');
const { Account } = require('../../src/models/associations');

// Mocking de las funciones de Sequelize
jest.mock('../../src/models/associations', () => ({
  Account: {
    create: jest.fn(),
  },
}));

describe('POST /api/account', () => {
  it('should create a new account', async () => {
    const newAccount = {
      name: 'Savings Account',
      description: 'Personal savings account',
      business_id: 1,
    };

    // Simular la respuesta de la función create
    Account.create.mockResolvedValue({ id: 1, ...newAccount });

    const response = await request(app)
      .post('/api/account')
      .send(newAccount);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newAccount.name);
  });

  it('should return 400 if data is invalid', async () => {
    const invalidAccount = {
      name: '',
      description: 'Personal savings account',
      business_id: null,
    };

    // Simular un error de validación
    Account.create.mockRejectedValue(new Error('Validation error'));

    const response = await request(app)
      .post('/api/account')
      .send(invalidAccount);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
