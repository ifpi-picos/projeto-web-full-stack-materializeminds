"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateSupllierServices_1 = __importDefault(require("../../services/supllierServices/CreateSupllierServices"));
const CreateAddressServices_1 = __importDefault(require("../../services/address/CreateAddressServices"));
class CreateSupplierController {
    async createSupplier(req, res) {
        try {
            const { id, nomeDaEmpresa, contato, email, senha, endereco } = req.body;
            const { rua, cidade, estado, cep } = endereco;
            const address = await CreateAddressServices_1.default.createAddress({ rua, cidade, estado, cep });
            if (!address.id) {
                throw new Error("Endereço invalido");
            }
            const addressId = address.id;
            const supplier = await CreateSupllierServices_1.default.createSupplier({
                id,
                nomeDaEmpresa,
                contato,
                email,
                senha,
                addressId,
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
