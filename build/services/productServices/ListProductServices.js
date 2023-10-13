"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ListProductServices {
    async listProduct() {
        const product = await prisma_1.prisma.product.findMany({
            take: 100
        });
        return product;
    }
}
exports.default = new ListProductServices();
