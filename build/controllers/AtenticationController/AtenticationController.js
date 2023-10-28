"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutenticationServices_1 = __importDefault(require("../../services/autenticationServices/AutenticationServices"));
class AutenticationController {
    async handle(req, res) {
        const { email, senha } = req.body;
        const token = await AutenticationServices_1.default.createAtentication({
            email,
            senha
        });
        return res.json(token);
    }
}
exports.default = new AutenticationController();
