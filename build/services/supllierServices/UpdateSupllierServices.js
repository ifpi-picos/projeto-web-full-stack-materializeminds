"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../lib/prisma");
class UpdateSupplierService {
    async createSupplier({ nomeDaEmpresa, addressId, contato, email, senha }) {
        const suplierAlreadyExists = await prisma_1.prisma.supplier.findFirst({
            where: {
                email
            }
        });
        if (suplierAlreadyExists) {
            new Error("Suplier already exists");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const supplier = await prisma_1.prisma.supplier.update({
            where: {
                email: email
            },
            data: {
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
exports.default = new UpdateSupplierService();
