import express from 'express';
import Multer from 'multer'

import CreateUserController from '../controllers/userController/CreateUserController';
import UpdateUserController from '../controllers/userController/UpdateUserController';
import DeleteUserController from '../controllers/userController/DeleteUserController';
import ReturnUserController from '../controllers/userController/ReturnUserController';

import atenticationController from '../controllers/AtenticationController/AtenticationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../controllers/RefreshTokenUserController/RefreshTokenUserController';

import CreateSupplierController from '../controllers/suplierController/CreateSupllierController';
import ReturnSupllierController from '../controllers/suplierController/ReturnSupllierController';
import UpdateSupllierController from '../controllers/suplierController/UpdateSupllierController';

import CartController from '../controllers/CartController/CartController';

import { uploadImage } from '../middlewares/uploadToFirebaseStorage';
import CreateProductController from '../controllers/productController/CreateProductController';
import ListProductController from '../controllers/productController/ListProductController';

import CreateOrdenController from '../controllers/ordenController/CreateOrdenController';
import DeleteOrderController from '../controllers/ordenController/DeleteOrderController';


const refreshTokenUserController = new RefreshTokenUserController()


const multer = Multer({
	storage: Multer.memoryStorage(),
});

const router = express.Router();


router.post('/user', CreateUserController.create);
router.delete('/user',DeleteUserController.delete);
router.get('/user',ReturnUserController.return)
router.put('/user-update/:id', ensureAuthenticated,UpdateUserController.handle);

router.post('/login', atenticationController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/supplier',CreateSupplierController.createSupplier)
router.get('/supplier',ReturnSupllierController.getSupllier)
router.put('/supplier',UpdateSupllierController.createSupplier)

router.post('/product',multer.single("file"),uploadImage,CreateProductController.createProduct);
router.get('/product',ListProductController.list)
router.get('/product/:id',ensureAuthenticated,)


router.post('/pedido',ensureAuthenticated,CreateOrdenController.createOrder)
router.delete('/pedido/:id',ensureAuthenticated,DeleteOrderController.deleteOrder)


router.post('/cart',CartController.createCart) 
router.get('/cart',CartController.listCart)


export default router
