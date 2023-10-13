"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class CreateUserServices {
    async createUser({ nome, sobrenome, endereco, email, senha, telefone }) {
        const userAlreadyExists = await prisma_1.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userAlreadyExists) {
            new Error("User already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                nome,
                sobrenome,
                endereco,
                email,
                senha: passwordHash,
                telefone
            }
        });
        return user;
    }
    async list() {
        const user = await prisma_1.prisma.user.findMany({
            include: {
                cart: true
            }
        });
        return user;
    }
}
exports.default = new CreateUserServices();
