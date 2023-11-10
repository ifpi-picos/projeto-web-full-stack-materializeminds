import express from 'express';
import Multer from 'multer'

import CreateUserController from '../controllers/userController/CreateUserController';
import UpdateUserController from '../controllers/userController/UpdateUserController';
import DeleteUserController from '../controllers/userController/DeleteUserController';
import ReturnUserController from '../controllers/userController/ReturnUserController';

import UserAtenticationController from '../controllers/AtenticationController/UserAutenticationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from '../controllers/RefreshTokenUserController/RefreshTokenUserController';

import CreateSupplierController from '../controllers/suplierController/CreateSupllierController';
import ReturnSupllierController from '../controllers/suplierController/ReturnSupllierController';
import UpdateSupllierController from '../controllers/suplierController/UpdateSupllierController';


import CartController from '../controllers/CartController/CartController';

import { uploadImage } from '../middlewares/uploadToFirebaseStorage';
import CreateProductController from '../controllers/productController/CreateProductController';
import ReturnProductController from '../controllers/productController/ReturnProductController';
import DeleteProductController from '../controllers/productController/DeleteProductController';

import CreateOrdenController from '../controllers/ordenController/CreateOrdenController';
import DeleteOrderController from '../controllers/ordenController/DeleteOrderController';


const refreshTokenUserController = new RefreshTokenUserController()


const multer = Multer({
	storage: Multer.memoryStorage(),
});

const router = express.Router();


router.post('/user', CreateUserController.create);
router.delete('/user/:userId',ensureAuthenticated,DeleteUserController.delete);
router.get('/user/:userId',ensureAuthenticated,ReturnUserController.return)
router.put('/user-update/:userId',ensureAuthenticated,UpdateUserController.handle);
router.post('/login', UserAtenticationController.userAtentication);
router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/supplier',CreateSupplierController.createSupplier)
router.get('/supplier/:supllierId',ReturnSupllierController.getSupllier)
router.put('/supplier',UpdateSupllierController.createSupplier)
// router.post('/supllier/login',SupllierAutenticationController.supllierAtentication);
// router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/product',multer.single("file"),uploadImage,CreateProductController.createProduct);
router.get('/',ReturnProductController.findMany)
router.get('/product/:productId',ReturnProductController.findUnique)
router.delete('/product/:productId',DeleteProductController.deleteUnique)

router.post('/pedido',ensureAuthenticated,CreateOrdenController.createOrder)
router.delete('/pedido/:id',ensureAuthenticated,DeleteOrderController.deleteOrder)


router.post('/cart',CartController.createCart) 
router.get('/cart',CartController.listCart)


export default router
