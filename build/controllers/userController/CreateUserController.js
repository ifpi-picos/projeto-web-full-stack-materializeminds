"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserServices_1 = __importDefault(require("../../services/userServers/CreateUserServices"));
class UserController {
    async handle(req, res) {
        const { nome, sobrenome, endereco, email, senha, telefone } = req.body;
        try {
            const user = await CreateUserServices_1.default.createUser({
                nome,
                sobrenome,
                endereco,
                email,
                senha,
                telefone,
            });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
        }
    }
    async list(req, res) {
        const user = await CreateUserServices_1.default.list();
        res.json(user);
    }
}
exports.default = new UserController();
