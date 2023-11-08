"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ReturnSupllierServices {
    async getSupllier({ suplierId }) {
        const supplier = await prisma_1.prisma.supplier.findMany({
            where: {
                id: suplierId
            },
            select: {
                id: true,
                nomeDaEmpresa: true,
                contato: true,
                email: true,
                products: true,
                address: true,
            }
        });
        return supplier;
    }
}
exports.default = new ReturnSupllierServices();
