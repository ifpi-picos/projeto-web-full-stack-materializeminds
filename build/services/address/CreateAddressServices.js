"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class CreateAddressServices {
    createAddress({ rua, cidade, estado, cep }) {
        // fazer a verificação para garantir unicidade em cada registro
        const address = prisma_1.prisma.address.create({
            data: {
                rua,
                cidade,
                estado,
                cep
            }
        });
        return address;
    }
}
exports.default = new CreateAddressServices();
