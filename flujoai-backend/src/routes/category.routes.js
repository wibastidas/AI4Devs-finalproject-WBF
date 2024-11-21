const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Protege todas las rutas de categories

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;



