"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SupllierServices_1 = __importDefault(require("../../services/supllierServices/SupllierServices"));
class SupplierController {
    async createSupplier(req, res) {
        try {
            const { nomeDaEmpresa, endereco, contato, email, senha } = req.body;
            const supplier = await SupllierServices_1.default.createSupplier({ nomeDaEmpresa, endereco, contato, email, senha });
            res.status(201).json(supplier);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao criar o fornecedor' });
        }
    }
    async list(req, res) {
        const supplier = await SupllierServices_1.default.list();
        res.json(supplier);
    }
}
exports.default = new SupplierController();
