"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateProductServices_1 = __importDefault(require("../../services/productServices/CreateProductServices"));
class CreateProductController {
    async createProduct(req, res) {
        try {
            const jsonObject = JSON.parse(req.body.data);
            const { nomeDoProduto, descricao, preco, estoque, categoria, supplierId } = jsonObject;
            if (!req.headers.filebaseUrl) {
                res.json({ "Erro": "ImageUrl not exits" });
            }
            const imageUrl = req.headers.filebaseUrl;
            const product = await CreateProductServices_1.default.createProduct({
                nomeDoProduto,
                descricao,
                preco,
                estoque,
                categoria,
                supplierId,
                imageUrl
            });
            res.status(201).json(product);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new CreateProductController();
