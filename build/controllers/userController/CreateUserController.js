"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserServices_1 = __importDefault(require("../../services/userServers/CreateUserServices"));
class CreateUserController {
    async create(req, res) {
        const { nome, email, senha, telefone } = req.body;
        try {
            const user = await CreateUserServices_1.default.createUser({
                nome,
                email,
                senha,
                telefone,
            });
            return res.json(user);
        }
        catch (erro) {
            console.error(erro);
            if (erro instanceof Error) {
                res.status(400).json({ erro: erro.message });
            }
        }
    }
}
exports.default = new CreateUserController();
