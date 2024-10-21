const request = require('supertest');
const app = require('../../src/app');
const { Transaction } = require('../../src/models/associations');

// Mocking de las funciones de Sequelize
jest.mock('../../src/models/associations', () => ({
  Transaction: {
    create: jest.fn(),
  },
}));

describe('POST /api/transactions', () => {
  beforeAll(() => {
    // No necesitas sincronizar la base de datos aquí
  });

  afterAll(() => {
    // No necesitas cerrar la conexión aquí
  });

  it('should create a new transaction', async () => {
    const newTransaction = {
      amount: 100.00,
      date: '2023-10-01',
      type: 'income',
      account_id: 1,
      category_id: 1,
      description: 'Test transaction',
    };

    // Simular la respuesta de la función create
    Transaction.create.mockResolvedValue({ id: 1, ...newTransaction });

    const response = await request(app)
      .post('/api/transactions')
      .send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.amount).toBe(newTransaction.amount);
  });

  it('should return 400 if data is invalid', async () => {
    const invalidTransaction = {
      amount: -100.00,
      date: '2023-10-01',
      type: 'income',
      account_id: 1,
      category_id: 1,
    };

    // Simular un error de validación
    Transaction.create.mockRejectedValue(new Error('Validation error'));

    const response = await request(app)
      .post('/api/transactions')
      .send(invalidTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
