"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class CreateOrderServices {
    async deleteOrder({ orderId }) {
        prisma_1.prisma.order.delete({
            where: {
                id: orderId
            }
        });
    }
}
exports.default = new CreateOrderServices();
