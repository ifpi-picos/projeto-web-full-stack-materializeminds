"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAutenticationServices_1 = __importDefault(require("../../services/autenticationServices/UserAutenticationServices"));
class UserAutenticationServices {
    async userAtentication(req, res) {
        const { email, senha } = req.body;
        try {
            const token = await UserAutenticationServices_1.default.createAtentication({
                email,
                senha
            });
            return res.json(token);
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
}
exports.default = new UserAutenticationServices();
