"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
const GenerateRefreshToken_1 = require("../../provider/GenerateRefreshToken");
const GenerateTokenProvider_1 = require("../../provider/GenerateTokenProvider");
class AutenticationServices {
    async createAtentication({ email, senha }) {
        const userAlreadyExists = await prisma_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!userAlreadyExists) {
            throw new Error(" User or password incorrect!");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(senha, userAlreadyExists.senha);
        if (!passwordMatch) {
            throw new Error(" User or password incorrect!");
        }
        const generateTokenProvider = new GenerateTokenProvider_1.GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists.id);
        await prisma_1.prisma.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        });
        const generateRefreshToken = new GenerateRefreshToken_1.GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);
        return { token, refreshToken };
    }
}
exports.default = new AutenticationServices();
