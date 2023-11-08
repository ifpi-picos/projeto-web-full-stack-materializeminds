"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class CreateUserServices {
    async createUser({ nome, email, senha, telefone }) {
        const userAlreadyExits = await prisma_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userAlreadyExits) {
            throw new Error('User already exists');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                nome,
                email,
                senha: passwordHash,
                telefone,
                accountStatus: 'ativo'
            }
        });
        return user;
    }
}
exports.default = new CreateUserServices();
