"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ListProductServices {
    async listProducts() {
        const product = await prisma_1.prisma.product.findMany({
            take: 20,
        });
        return product;
    }
    async listUniqueProduct({ productId }) {
        const product = await prisma_1.prisma.product.findUnique({
            where: {
                id: productId
            }
        });
    }
    async listCategoryProducts() {
        // A fazer
    }
}
exports.default = new ListProductServices();
