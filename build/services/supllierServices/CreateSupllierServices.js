"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class CreateSupplierService {
    async createSupplier({ id, nomeDaEmpresa, addressId, contato, email, senha }) {
        const suplierAlreadyExists = await prisma_1.prisma.supplier.findFirst({
            where: {
                email
            }
        });
        if (suplierAlreadyExists) {
            new Error("Suplier already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const supplier = await prisma_1.prisma.supplier.create({
            data: {
                id,
                nomeDaEmpresa,
                addressId,
                contato,
                email,
                senha: passwordHash
            }
        });
        return supplier;
    }
}
exports.default = new CreateSupplierService();
