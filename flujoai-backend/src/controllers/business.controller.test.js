const { createBusiness } = require('./business.controller');
const { Business } = require('../models/associations');

// Mock de la función create de Sequelize
jest.mock('../models/associations', () => ({
  Business: {
    create: jest.fn(),
  },
}));

describe('Business Controller', () => {
  describe('createBusiness', () => {
    it('should create a new business and return 201 status', async () => {
      const req = {
        body: {
          name: 'Tech Corp',
          description: 'Technology company',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.create.mockResolvedValue({ id: 1, ...req.body });

      await createBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if name is missing', async () => {
      const req = {
        body: {
          name: '',
          description: 'Technology company',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });
});

