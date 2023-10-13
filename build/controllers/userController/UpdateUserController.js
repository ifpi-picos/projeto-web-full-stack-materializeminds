"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateUserServices_1 = __importDefault(require("../../services/userServers/UpdateUserServices"));
class UpdateUserController {
    async handle(req, res) {
        const { nome, sobrenome, endereco, email, senha, telefone, userId } = req.body;
        try {
            const user = await UpdateUserServices_1.default.update({
                nome,
                sobrenome,
                endereco,
                email,
                senha,
                telefone,
                userId
            });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new UpdateUserController();
