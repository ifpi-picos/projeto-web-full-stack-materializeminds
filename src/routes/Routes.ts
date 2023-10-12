import express, { response } from 'express';

import userController from '../controllers/userController/CreateUserController';
import SupplierController from '../controllers/SupllierController';
import ProductController from '../controllers/ProductController';
import CartController from '../controllers/CartController';
import atenticationController from '../controllers/AtenticationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../controllers/RefreshTokenUserController';
import ProductService from '../services/productServices/ProductService';


const router = express.Router();

const refreshTokenUserController = new RefreshTokenUserController()

// Rotas para criar usuários, fornecedores e produtos
router.post('/users', userController.handle);
router.put('/users-update/:id', ensureAuthenticated,userController.handle);

router.post('/login', atenticationController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.post('/product',ProductService.createProduct)
router.post('/cart',CartController.createCart) 
router.post('/suppliers', SupplierController.createSupplier);


router.get('/products',ensureAuthenticated,(request,response)=>{
		return response.json([
			{id:1, name:"celular"},
			{id:2, name:"mesa"},
			{id:3, name:"copo"},
			{id:4, name:"relogio"},
		])
})

// Rotas de teste

router.get('/listSupllier',SupplierController.list)
router.get('/user',userController.list)
router.get('/cart',CartController.listCart)


export default router;
