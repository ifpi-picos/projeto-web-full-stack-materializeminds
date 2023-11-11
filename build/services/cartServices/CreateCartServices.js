"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class CreateCartServices {
    async createCartProduct({ status, total, userId, productId }) {
        const userAlreadyExists = await prisma_1.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: { cart: true }
        });
        if (userAlreadyExists?.cart) {
            return userAlreadyExists.cart;
        }
        const newCart = await prisma_1.prisma.cart.create({
            data: {
                status,
                total: 0.0,
                userId: userId,
                productId
            },
        });
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: {
                cart: {
                    connect: { id: newCart.id },
                },
            },
        });
        return newCart;
    }
    async list() {
        const cart = await prisma_1.prisma.cart.findMany();
        return cart;
    }
}
exports.default = new CreateCartServices();
