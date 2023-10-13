"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreateUserController_1 = __importDefault(require("../controllers/userController/CreateUserController"));
const SupllierController_1 = __importDefault(require("../controllers/suplierController/SupllierController"));
const CartController_1 = __importDefault(require("../controllers/CartController"));
const AtenticationController_1 = __importDefault(require("../controllers/AtenticationController"));
const ProductController_1 = __importDefault(require("../controllers/productController/ProductController"));
const ListProductController_1 = __importDefault(require("../controllers/productController/ListProductController"));
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const RefreshTokenUserController_1 = require("../controllers/RefreshTokenUserController");
const router = express_1.default.Router();
const refreshTokenUserController = new RefreshTokenUserController_1.RefreshTokenUserController();
router.get('/', ListProductController_1.default.list);
// Rotas para criar usuários, fornecedores e produtos
router.post('/users', CreateUserController_1.default.handle);
router.put('/users-update/:id', ensureAuthenticated_1.ensureAuthenticated, CreateUserController_1.default.handle);
router.post('/login', AtenticationController_1.default.handle);
router.post('/refresh-token', refreshTokenUserController.handle);
router.post('/product', ProductController_1.default.createProduct);
router.post('/cart', CartController_1.default.createCart);
// router.post('/suppliers', SupplierController.createSupplier);
router.get('/products', ensureAuthenticated_1.ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1, name: "celular" },
        { id: 2, name: "mesa" },
        { id: 3, name: "copo" },
        { id: 4, name: "relogio" },
    ]);
});
// Rotas de teste
router.get('/listSupllier', SupllierController_1.default.list);
router.get('/user', CreateUserController_1.default.list);
router.get('/cart', CartController_1.default.listCart);
exports.default = router;
