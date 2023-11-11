"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListProductServices_1 = __importDefault(require("../../services/productServices/ListProductServices"));
class ReturnProductController {
    async findMany(req, res) {
        try {
            const products = await ListProductServices_1.default.listProducts();
            return res.status(200).json(products);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error: "Não foi possivel retorna os produtos." });
        }
    }
    async findUnique(req, res) {
        const { productId } = req.params;
        try {
            const product = await ListProductServices_1.default.listUniqueProduct({ productId });
            return res.status(200).json(product);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error: "Produto não foi encontrado !" });
        }
    }
    async findCategoryProducts(req, res) {
    }
}
exports.default = new ReturnProductController();
