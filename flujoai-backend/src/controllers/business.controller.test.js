const { createBusiness, getAllBusinesses, getBusinessById, updateBusiness, deleteBusiness } = require('./business.controller');
const { Business } = require('../models/associations');
const sequelize = require('../config/database');

// Mocks
jest.mock('../config/database', () => ({
  transaction: jest.fn(() => ({
    commit: jest.fn(),
    rollback: jest.fn()
  }))
}));

jest.mock('../models/associations', () => ({
  Business: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Business Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBusiness', () => {
    it('should create a new business', async () => {
      const mockBusiness = {
        id: 1,
        name: 'Test Business',
        description: 'Test Description'
      };

      Business.create.mockResolvedValue(mockBusiness);

      const req = {
        body: { name: 'Test Business', description: 'Test Description' },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockBusiness);
    });
  });

  describe('getAllBusinesses', () => {
    it('should return all businesses', async () => {
      const mockBusinesses = [
        { id: 1, name: 'Business 1' },
        { id: 2, name: 'Business 2' }
      ];

      Business.findAll.mockResolvedValue(mockBusinesses);

      const req = {
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllBusinesses(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBusinesses);
    });
  });

  describe('getBusinessById', () => {
    it('should return a business by ID', async () => {
      const mockBusiness = { id: 1, name: 'Test Business' };

      Business.findOne.mockResolvedValue(mockBusiness);

      const req = {
        params: { id: 1 },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getBusinessById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBusiness);
    });

    it('should return 404 if business not found', async () => {
      Business.findOne.mockResolvedValue(null);

      const req = {
        params: { id: 999 },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getBusinessById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business not found' });
    });
  });

  describe('updateBusiness', () => {
    it('should update a business', async () => {
      const mockUpdated = [1];
      const mockBusiness = { id: 1, name: 'Updated Business' };

      Business.update.mockResolvedValue(mockUpdated);
      Business.findOne.mockResolvedValue(mockBusiness);

      const req = {
        params: { id: 1 },
        body: { name: 'Updated Business' },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBusiness);
    });
  });

  describe('deleteBusiness', () => {
    it('should delete a business', async () => {
      Business.destroy.mockResolvedValue(1);

      const req = {
        params: { id: 1 },
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };

      await deleteBusiness(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
});
