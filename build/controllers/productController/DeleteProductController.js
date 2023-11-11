"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteProductServices_1 = __importDefault(require("../../services/productServices/DeleteProductServices"));
class DeleteProductController {
    async deleteUnique(req, res) {
        const { productId } = req.params;
        try {
            const deletedProduct = DeleteProductServices_1.default.deleteUniqueProduct({ productId });
            const menssage = `O produto ${(await deletedProduct).nomeDoProduto} foi deletado`;
            res.status(200).json(menssage);
        }
        catch (error) {
            console.log(error);
            res.status(200).json("Erro ao deletar o produto");
        }
    }
}
exports.default = new DeleteProductController;
