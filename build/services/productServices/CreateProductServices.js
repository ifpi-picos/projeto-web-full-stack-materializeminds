"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class CreateProductServices {
    async createProduct({ nomeDoProduto, descricao, preco, estoque, categoria, supplierId, imageUrl }) {
        // Verificar se existe o produto
        const newProduct = await prisma_1.prisma.product.create({
            data: {
                nomeDoProduto,
                descricao,
                preco,
                estoque,
                categoria,
                supplierId,
                imageUrl
            },
        });
        await prisma_1.prisma.supplier.update({
            where: { id: supplierId },
            data: {
                products: {
                    connect: { id: newProduct.id },
                },
            },
        });
        return newProduct;
    }
}
exports.default = new CreateProductServices();
