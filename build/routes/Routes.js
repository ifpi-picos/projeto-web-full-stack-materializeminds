"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = __importDefault(require("../controllers/userController/CreateUserController"));
const SupllierController_1 = __importDefault(require("../controllers/suplierController/SupllierController"));
const CartController_1 = __importDefault(require("../controllers/CartController/CartController"));
const AtenticationController_1 = __importDefault(require("../controllers/AtenticationController/AtenticationController"));
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const RefreshTokenUserController_1 = require("../controllers/RefreshTokenUserController/RefreshTokenUserController");
const uploadToFirebaseStorage_1 = require("../middlewares/uploadToFirebaseStorage");
const CreateProductController_1 = __importDefault(require("../controllers/productController/CreateProductController"));
const SupllierController_2 = __importDefault(require("../controllers/suplierController/SupllierController"));
const ListProductController_1 = __importDefault(require("../controllers/productController/ListProductController"));
const CreateOrdenController_1 = __importDefault(require("../controllers/ordenController/CreateOrdenController"));
const DeleteOrderController_1 = __importDefault(require("../controllers/ordenController/DeleteOrderController"));
const refreshTokenUserController = new RefreshTokenUserController_1.RefreshTokenUserController();
const multer = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
const router = express_1.default.Router();
router.post('/product', multer.single("file"), uploadToFirebaseStorage_1.uploadImage, CreateProductController_1.default.createProduct);
router.get('/product', ListProductController_1.default.list);
router.get('/product/:id', ensureAuthenticated_1.ensureAuthenticated);
router.post('/users', CreateUserController_1.default.handle);
router.get('/user', CreateUserController_1.default.list);
router.put('/users-update/:id', ensureAuthenticated_1.ensureAuthenticated, CreateUserController_1.default.handle);
router.post('/login', AtenticationController_1.default.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.post('/suppliers', SupllierController_2.default.createSupplier);
router.get('/listSupllier', SupllierController_1.default.list);
router.post('/pedido', ensureAuthenticated_1.ensureAuthenticated, CreateOrdenController_1.default.createOrder);
router.delete('/pedido/:id', ensureAuthenticated_1.ensureAuthenticated, DeleteOrderController_1.default.deleteOrder);
router.post('/cart', CartController_1.default.createCart);
router.get('/cart', CartController_1.default.listCart);
exports.default = router;
