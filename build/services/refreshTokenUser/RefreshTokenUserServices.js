"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = require("../../lib/prisma");
const GenerateTokenProvider_1 = require("../../provider/GenerateTokenProvider");
const GenerateRefreshToken_1 = require("../../provider/GenerateRefreshToken");
class RefreshTokenUserServices {
    async execute(userId) {
        const refreshToken = await prisma_1.prisma.refreshToken.findFirst({
            where: {
                userId: userId
            }
        });
        console.log(refreshToken);
        if (!refreshToken) {
            throw new Error("Refresh token invalid");
        }
        const refreshTokenExpired = dayjs_1.default.isDayjs(dayjs_1.default.unix(refreshToken.expiresIn));
        const generateTokenProvider = new GenerateTokenProvider_1.GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);
        if (!refreshTokenExpired) { // Fazer um melhor entendimento
            await prisma_1.prisma.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            });
            const generateRefreshToken = new GenerateRefreshToken_1.GenerateRefreshToken();
            const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId);
            return { token, newRefreshToken };
        }
        return { token };
    }
}
exports.default = new RefreshTokenUserServices();
