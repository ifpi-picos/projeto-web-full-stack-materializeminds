import express from 'express';
import Multer from 'multer'

import userController from '../controllers/userController/CreateUserController';
import SupplierController from '../controllers/suplierController/SupllierController';
import CartController from '../controllers/CartController/CartController';
import atenticationController from '../controllers/AtenticationController/AtenticationController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../controllers/RefreshTokenUserController/RefreshTokenUserController';

import { uploadImage } from '../middlewares/uploadToFirebaseStorage';
import CreateProductController from '../controllers/productController/CreateProductController';
import SupllierController from '../controllers/suplierController/SupllierController';
import ListProductController from '../controllers/productController/ListProductController';

import CreateOrdenController from '../controllers/ordenController/CreateOrdenController';
import DeleteOrderController from '../controllers/ordenController/DeleteOrderController';


const refreshTokenUserController = new RefreshTokenUserController()


const multer = Multer({
	storage: Multer.memoryStorage(),
});

const router = express.Router();


router.post('/product',multer.single("file"),uploadImage,CreateProductController.createProduct);
router.get('/product',ListProductController.list)
router.get('/product/:id',ensureAuthenticated,)

router.post('/users', userController.handle);
router.get('/user',userController.list)
router.put('/users-update/:id', ensureAuthenticated,userController.handle);

router.post('/login', atenticationController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/suppliers',SupllierController.createSupplier)
router.get('/listSupllier',SupplierController.list)

router.post('/pedido',ensureAuthenticated,CreateOrdenController.createOrder)
router.delete('/pedido/:id',ensureAuthenticated,DeleteOrderController.deleteOrder)

router.post('/cart',CartController.createCart) 
router.get('/cart',CartController.listCart)


export default router
