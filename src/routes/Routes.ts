import express from 'express';
import Multer from 'multer'

import CreateUserController from '../useCase/useServices/CreateUser/CreateUserController';
import UpdateUserController from '../useCase/useServices/updateUser/UpdateUserController';
import DeleteUserController from '../useCase/useServices/deleteUser/DeleteUserController';
import ReturnUserController from '../useCase/useServices/returnUser/ReturnUserController';

import UserAtenticationController from '../useCase/autenticationServices/autenticationUserServices/UserAutenticationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../useCase/refreshToken/refreshTokenUser/RefreshTokenUserController';
import RefreshTokenSupllierController from '../useCase/refreshToken/refreshTokenSupllier/RefreshTokenSupllierController';
import SupllierAutenticationController from '../useCase/autenticationServices/autenticationSupllierServices/SupllierAutenticationController';

import CreateSupplierController from '../useCase/supllierServices/createSupllier/CreateSupllierController';
import ReturnSupllierController from '../useCase/supllierServices/returnSupllier/ReturnSupllierController';
import UpdateSupllierController from '../useCase/supllierServices/updateSupllier/UpdateSupllierController';


import CartController from '../useCase/cartServices/create/CartController';

import { uploadImage } from '../middlewares/uploadToFirebaseStorage';
import CreateProductController from '../useCase/productServices/create/CreateProductController';
import ReturnProductController from '../useCase/productServices/return/ReturnProductController';
import DeleteProductController from '../useCase/productServices/delete/DeleteProductController';

import CreateOrdenController from '../useCase/order/create/CreateOrdenController';
import DeleteOrderController from '../useCase/order/delete/DeleteOrderController';


const refreshTokenUserController = new RefreshTokenUserController()


const multer = Multer({
	storage: Multer.memoryStorage(),
});

const router = express.Router();

router.post('/user', CreateUserController.create);
router.delete('/user',DeleteUserController.delete);
router.get('/user/:userId',ensureAuthenticated,ReturnUserController.return)
router.put('/user-update/:userId',ensureAuthenticated,UpdateUserController.handle);
router.post('/login', UserAtenticationController.userAtentication);
router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/supplier',CreateSupplierController.createSupplier)
router.get('/supplier/:supllierId',ReturnSupllierController.getSupllier)
router.put('/supplier',UpdateSupllierController.createSupplier)
router.post('/supllier/login', SupllierAutenticationController.supllierAtentication);
router.post('/supllier/refresh-token', RefreshTokenSupllierController.handle);

router.post('supllier/product/add',ensureAuthenticated,multer.single("file"),uploadImage,CreateProductController.createProduct);
router.get('/product',ReturnProductController.findMany)
router.get('/product/:productId',ReturnProductController.findUnique)
router.delete('/product/:productId',ensureAuthenticated,DeleteProductController.deleteUnique)

router.post('/pedido',ensureAuthenticated,CreateOrdenController.createOrder)
router.delete('/pedido/:id',ensureAuthenticated,DeleteOrderController.deleteOrder)


router.post('/cart',CartController.createCart) 
router.get('/cart',CartController.listCart)


export default router
