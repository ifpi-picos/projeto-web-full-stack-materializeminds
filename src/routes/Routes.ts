import express from 'express';
import Multer from 'multer'

import CreateUserController from '../useCase/useServices/CreateUser/CreateUserController';
import UpdateUserController from '../useCase/useServices/updateUser/UpdateUserController';
import DeleteUserController from '../useCase/useServices/deleteUser/DeleteUserController';
import ReturnUserController from '../useCase/useServices/returnUser/ReturnUserController';

import UserAtenticationController from '../useCase/autentication/autenticationUser/UserAutenticationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../useCase/refreshToken/refreshTokenUser/RefreshTokenUserController';
import RefreshTokenSupllierController from '../useCase/refreshToken/refreshTokenSupllier/RefreshTokenSupllierController';
import SupllierAutenticationController from '../useCase/autentication/autenticationSupllier/SupllierAutenticationController';

import CreateSupplierController from '../useCase/supllier/createSupllier/CreateSupllierController';
import ReturnSupllierController from '../useCase/supllier/returnSupllier/ReturnSupllierController';
import UpdateSupllierController from '../useCase/supllier/updateSupllier/UpdateSupllierController';
import DeleteSupllierController from '../useCase/supllier/deleteSupllier/DeleteSupllierController';

import CreateCartController from '../useCase/cart/create/CreateCartController';
import returnCartController from '../useCase/cart/return/returnCartController';
import DeleteCartController from '../useCase/cart/delete/DeleteCartController';

import CreateCartItemController from '../useCase/cartItem/create/CreateCartItemController';
import DeleteCartItemController from '../useCase/cartItem/delete/DeleteCartItemController';
import UpdateCartItemController from '../useCase/cartItem/update/UpdateCartItemController';

import { uploadImage } from '../middlewares/uploadToFirebaseStorage';
import CreateProductController from '../useCase/product/create/CreateProductController';
import ReturnProductController from '../useCase/product/return/ReturnProductController';
import DeleteProductController from '../useCase/product/delete/DeleteProductController';

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

router.post('/supllier',CreateSupplierController.createSupplier)
router.get('/supplier/:supllierId',ReturnSupllierController.getSupllier)
router.put('/supplier',UpdateSupllierController.createSupplier)
router.delete('/supllier/:suplierId',DeleteSupllierController.deleteSupllier)

router.post('/supllier/login', SupllierAutenticationController.supllierAtentication);
router.post('/supllier/refresh-token', RefreshTokenSupllierController.handle);

router.post('/supllier/product/add',multer.single("file"),uploadImage,CreateProductController.createProduct);
router.delete('/product/:productId',DeleteProductController.deleteUnique)
router.get('/product',ReturnProductController.findMany)
router.get('/product/:productId',ReturnProductController.findUnique)
router.get('/products/filter/:categoria',ReturnProductController.findCategoryProducts)
router.get('/searchProduct/:searchTerm',ReturnProductController.searchProducts)

router.post('/pedido',ensureAuthenticated,CreateOrdenController.createOrder)
router.delete('/pedido/:id',ensureAuthenticated,DeleteOrderController.deleteOrder)

router.post('/cart',CreateCartController.createCart) 
router.get('/cart/:userId',returnCartController.getCart)
router.delete('/cart/:cartId',DeleteCartController.deleteCart)

router.post('/add/cartItem/cart',CreateCartItemController.createCartItem)
router.delete('/cartItem/:cartItem',DeleteCartItemController.deleteCart)
router.put('/cartItem/:cartId',UpdateCartItemController.updateCartItem)


export default router
