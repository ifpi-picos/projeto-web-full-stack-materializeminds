"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../../services/productServices/ProductService"));
class ProductController {
    async createProduct(req, res) {
        try {
            const { nomeDoProduto, descricao, preco, estoque, categoria, supplierId } = req.body;
            const precoNumber = Number(preco);
            const estoqueNumber = Number(estoque);
            console.log(typeof preco);
            const product = await ProductService_1.default.createProduct({
                nomeDoProduto,
                descricao,
                preco: precoNumber,
                estoque: estoqueNumber,
                categoria,
                supplierId
            });
            res.status(201).json(product);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao criar o produto' });
        }
    }
}
exports.default = new ProductController();
