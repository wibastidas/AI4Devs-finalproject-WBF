const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const { User } = require('../models/associations');

// Mock de las funciones de Sequelize
jest.mock('../models/associations', () => ({
  User: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a new user and return 201 status', async () => {
      const req = {
        body: {
          username: 'john_doe',
          email: 'john@example.com',
          password: 'securepassword123',
          business_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.create.mockResolvedValue({ id: 1, ...req.body });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 400 if data is invalid', async () => {
      const req = {
        body: {
          username: '',
          email: 'not-an-email',
          password: '123',
          business_id: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUsers = [
        { id: 1, username: 'john_doe', email: 'john@example.com' },
        { id: 2, username: 'jane_doe', email: 'jane@example.com' },
      ];

      User.findAll.mockResolvedValue(mockUsers);

      await getAllUsers({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { id: 1, username: 'john_doe', email: 'john@example.com' };

      User.findByPk.mockResolvedValue(mockUser);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByPk.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const req = {
        params: { id: 1 },
        body: { username: 'updated_john_doe', email: 'updated_john@example.com' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.update.mockResolvedValue([1]); // Indica que una fila fue actualizada
      User.findByPk.mockResolvedValue({ id: 1, ...req.body });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it('should return 404 if user to update not found', async () => {
      const req = {
        params: { id: 9999 },
        body: { username: 'non_existent_user' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.update.mockResolvedValue([0]); // Indica que ninguna fila fue actualizada

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.destroy.mockResolvedValue(1); // Indica que una fila fue eliminada

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should return 404 if user to delete not found', async () => {
      const req = { params: { id: 9999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.destroy.mockResolvedValue(0); // Indica que ninguna fila fue eliminada

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });
});
