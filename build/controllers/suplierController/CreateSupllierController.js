"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateSupllierServices_1 = __importDefault(require("../../services/supllierServices/CreateSupllierServices"));
class CreateSupplierController {
    async createSupplier(req, res) {
        try {
            const { id, nomeDaEmpresa, addressId, contato, email, senha } = req.body;
            const supplier = await CreateSupllierServices_1.default.createSupplier({
                id,
                nomeDaEmpresa,
                addressId,
                contato,
                email,
                senha
            });
            res.status(201).json(supplier);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao criar o fornecedor' });
        }
    }
}
exports.default = new CreateSupplierController();
