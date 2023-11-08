"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ReturnUserServices {
    async getUSer({ userId }) {
        if (!userId) {
            return new Error("Email Ivalido");
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                cart: true,
                telefone: true,
                orders: true,
                refresh_token: true,
            }
        });
        return user;
    }
}
exports.default = new ReturnUserServices();
