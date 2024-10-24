const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');

const router = express.Router();

// Ruta para crear una nueva categoría
router.post('/category', createCategory);

// Ruta para obtener todas las categorías
router.get('/categories', getAllCategories);

// Ruta para obtener una categoría por ID
router.get('/category/:id', getCategoryById);

// Ruta para actualizar una categoría
router.put('/category/:id', updateCategory);

// Ruta para eliminar una categoría
router.delete('/category/:id', deleteCategory);

module.exports = router;



