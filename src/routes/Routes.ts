import express from 'express';

import UserController from '../controllers/UserController';
import SupplierController from '../controllers/SupllierController';
import ProductController from '../controllers/ProductController';
import CartController from '../controllers/CartController';

const router = express.Router();

// Rotas para criar usuários, fornecedores e produtos
router.post('/users', UserController.createUser);
router.get('/user',UserController.list)

router.post('/suppliers', SupplierController.createSupplier);
router.post('/products', ProductController.createProduct);

router.post('/add',ProductController.addProductToSupplier);
router.get('/listSupllier',SupplierController.list)

router.post('/cart',CartController.createCart)
router.get('/cart',CartController.listCart)

export default router;
