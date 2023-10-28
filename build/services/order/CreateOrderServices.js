"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class CreateOrderServices {
    async createOrder({ status, total, addressId, userId }) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        const ordem = await prisma_1.prisma.order.create({
            data: {
                dataDoPedido: new Date(),
                status,
                total,
                addressId,
                userId
            }
        });
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                orders: {
                    connect: { id: ordem.id },
                },
            },
        });
        return ordem;
    }
    dele() {
        prisma_1.prisma.order.deleteMany({});
    }
}
exports.default = new CreateOrderServices();
