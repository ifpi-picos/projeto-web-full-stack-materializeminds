"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class OrderItemServices {
    async createOrderIten({ quantidade, precoUnitario, total, orderId, productId }) {
        const orderAlreadyExits = prisma_1.prisma.order.findFirst({
            where: {
                id: orderId
            }
        });
        if (!orderAlreadyExits) {
            return new Error("Pedido não existe");
        }
        const productAlreadyExits = prisma_1.prisma.product.findFirst({
            where: {
                id: productId
            }
        });
        if (!productAlreadyExits) {
            return new Error("Produto não existe");
        }
        const newOrderItem = await prisma_1.prisma.orderItem.create({
            data: {
                quantidade,
                precoUnitario,
                total,
                orderId,
                productId
            },
        });
        await prisma_1.prisma.order.update({
            where: { id: orderId },
            data: {
                orderItems: {
                    connect: { id: newOrderItem.id },
                },
            },
        });
        return newOrderItem;
    }
}
exports.default = new OrderItemServices();
