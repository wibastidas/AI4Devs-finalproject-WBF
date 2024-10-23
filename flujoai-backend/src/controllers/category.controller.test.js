const { createCategory } = require('./category.controller');
const { Category } = require('../models/associations');

// Mock de la función create de Sequelize
jest.mock('../models/associations', () => ({
  Category: {
    create: jest.fn(),
  },
}));

describe('Category Controller', () => {
  describe('createCategory', () => {
    it('should create a new category and return 201 status', async () => {
      const req = {
        body: {
          name: 'Utilities',
          description: 'Monthly utility bills',
          business_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Category.create.mockResolvedValue({ id: 1, ...req.body });

      await createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if name or business_id is missing', async () => {
      const req = {
        body: {
          name: '',
          description: 'Monthly utility bills',
          business_id: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });
});

