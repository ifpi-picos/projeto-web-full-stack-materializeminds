"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListProductServices_1 = __importDefault(require("../../services/productServices/ListProductServices"));
class ListProductController {
    list(request, response) {
        try {
            const listProduct = ListProductServices_1.default.listProduct();
            return response.status(200).json(listProduct);
        }
        catch (error) {
            response.status(400).json({ error: "Não foi possivel listar os produtos, tende novamente !" });
        }
    }
}
exports.default = new ListProductController();
