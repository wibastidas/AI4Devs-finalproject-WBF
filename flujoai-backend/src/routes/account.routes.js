const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Protege todas las rutas de accounts

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
