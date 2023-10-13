"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../lib/prisma");
class ProductService {
    async createProduct({ nomeDoProduto, descricao, preco, estoque, categoria, supplierId }) {
        // Verificar se existe o produto
        const newProduct = prisma_1.prisma.product.create({
            data: {
                nomeDoProduto,
                descricao,
                preco,
                estoque,
                categoria,
                supplierId,
            },
        });
        await prisma_1.prisma.supplier.update({
            where: { id: supplierId },
            data: {
                products: {
                    connect: { id: (await newProduct).id },
                },
            },
        });
        return newProduct;
    }
}
exports.default = new ProductService();
