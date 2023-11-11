"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUserController = void 0;
const RefreshTokenUserServices_1 = __importDefault(require("../../services/refreshTokenUser/RefreshTokenUserServices"));
class RefreshTokenUserController {
    async handle(req, res) {
        const { userId } = req.body;
        try {
            const token = await RefreshTokenUserServices_1.default.execute(userId);
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
exports.RefreshTokenUserController = RefreshTokenUserController;
