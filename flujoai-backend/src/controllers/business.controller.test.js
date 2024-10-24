const { createBusiness, getAllBusinesses, getBusinessById, updateBusiness, deleteBusiness } = require('./business.controller');
const { Business } = require('../models/associations');

// Mock de las funciones de Sequelize
jest.mock('../models/associations', () => ({
  Business: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
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

  describe('getAllBusinesses', () => {
    it('should return all businesses', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockBusinesses = [
        { id: 1, name: 'Tech Corp', description: 'Technology company' },
        { id: 2, name: 'Health Inc', description: 'Healthcare company' },
      ];

      Business.findAll.mockResolvedValue(mockBusinesses);

      await getAllBusinesses({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBusinesses);
    });
  });

  describe('getBusinessById', () => {
    it('should return a business by ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockBusiness = { id: 1, name: 'Tech Corp', description: 'Technology company' };

      Business.findByPk.mockResolvedValue(mockBusiness);

      await getBusinessById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBusiness);
    });

    it('should return 404 if business not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.findByPk.mockResolvedValue(null);

      await getBusinessById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business not found' });
    });
  });

  describe('updateBusiness', () => {
    it('should update a business', async () => {
      const req = {
        params: { id: 1 },
        body: { name: 'Updated Tech Corp', description: 'Updated description' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.update.mockResolvedValue([1]); // Indica que una fila fue actualizada
      Business.findByPk.mockResolvedValue({ id: 1, ...req.body });

      await updateBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 404 if business to update not found', async () => {
      const req = {
        params: { id: 9999 },
        body: { name: 'Non-existent Business' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.update.mockResolvedValue([0]); // Indica que ninguna fila fue actualizada

      await updateBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business not found' });
    });
  });

  describe('deleteBusiness', () => {
    it('should delete a business', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.destroy.mockResolvedValue(1); // Indica que una fila fue eliminada

      await deleteBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return 404 if business to delete not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Business.destroy.mockResolvedValue(0); // Indica que ninguna fila fue eliminada

      await deleteBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business not found' });
    });
  });
});
