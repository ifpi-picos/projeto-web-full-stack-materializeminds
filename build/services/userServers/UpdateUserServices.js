"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class UpdateUserServices {
    async update({ nome, sobrenome, endereco, email, senha, telefone, userId }) {
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const userUpdate = await prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                nome,
                sobrenome,
                endereco,
                email,
                senha: passwordHash,
                telefone
            }
        });
        return userUpdate;
    }
}
exports.default = new UpdateUserServices();
