import express from 'express';
import { register, login } from './auth.js';
import { getSellers, getSellerCatalog, createOrder } from '../controllers/buyer.js';
import { createCatalog, getOrders } from '../controllers/seller.js';
import { verifyToken } from '../middleware/middleware.js';

const router = express.Router();

// Auth APIs
router.post('/api/auth/register', register);
router.post('/api/auth/login', login);

// APIs for buyers
router.get('/api/buyer/list-of-sellers', getSellers);
router.get('/api/buyer/seller-catalog/:seller_id', getSellerCatalog);
router.post('/api/buyer/create-order/:seller_id',verifyToken, createOrder);

// APIs for sellers
router.post('/api/seller/create-catalog', verifyToken, createCatalog);
router.get('/api/seller/orders', verifyToken, getOrders);

export default router;
