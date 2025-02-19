const express = require('express');
const { getProducts, selectProduct } = require('../controllers/productController');
//const verifyToken = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', getProducts);  
router.post('/select', selectProduct); 

module.exports = router;
