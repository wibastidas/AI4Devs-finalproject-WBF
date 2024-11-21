const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/', businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);
router.get('/:id', businessController.getBusinessById);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;
