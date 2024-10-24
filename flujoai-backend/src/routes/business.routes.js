const express = require('express');
const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness
} = require('../controllers/business.controller');

const router = express.Router();

router.post('/business', createBusiness);
router.get('/business', getAllBusinesses);
router.get('/business/:id', getBusinessById);
router.put('/business/:id', updateBusiness);
router.delete('/business/:id', deleteBusiness);

module.exports = router;
