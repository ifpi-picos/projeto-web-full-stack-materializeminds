"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateSupllierServices_1 = __importDefault(require("../../services/supllierServices/UpdateSupllierServices"));
class UpdateSupplierController {
    async createSupplier(req, res) {
        try {
            const { nomeDaEmpresa, addressId, contato, email, senha } = req.body;
            const supplier = await UpdateSupllierServices_1.default.createSupplier({ nomeDaEmpresa, addressId, contato, email, senha });
            res.status(201).json(supplier);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao criar o fornecedor' });
        }
    }
}
exports.default = new UpdateSupplierController();
