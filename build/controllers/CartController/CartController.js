"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCartServices_1 = __importDefault(require("../../services/cartServices/CreateCartServices"));
class CartController {
    async createCart(req, res) {
        try {
            const { status, total, userId, productId } = req.body;
            const totalNumber = Number(total);
            const cart = await CreateCartServices_1.default.createCartProduct({
                status,
                total: totalNumber,
                userId,
                productId
            });
            res.status(201).json(cart);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao criar o carrinho' });
        }
    }
    async listCart(req, res) {
        const products = await CreateCartServices_1.default.list();
        res.json(products);
    }
}
exports.default = new CartController();
