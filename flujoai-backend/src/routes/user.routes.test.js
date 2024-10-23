const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/models/associations');

// Mocking de las funciones de Sequelize
jest.mock('../../src/models/associations', () => ({
  User: {
    create: jest.fn().mockResolvedValue({
      id: 1, // Asegúrate de incluir un 'id'
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword123',
      business_id: 1,
    }),
  },
}));

describe('POST /api/user', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword123',
      business_id: 1,  
    };

    const response = await request(app)
      .post('/api/user')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);
  });

  it('should return 400 if data is invalid', async () => {
    const invalidUser = {
      username: '',
      email: 'not-an-email',
      password: '123',
    };

    // Simular un error de validación
    User.create.mockRejectedValue(new Error('Validation error'));

    const response = await request(app)
      .post('/api/user')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
