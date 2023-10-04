import { prisma } from "../../lib/prisma";

class ProductService {
  async createProduct(nomeDoProduto: string, descricao: string, preco: number, estoque: number, categoria: string, supplierId: string) {
    return prisma.product.create({
      data: {
        nomeDoProduto,  
        descricao,
        preco,
        estoque,
        categoria,
        supplierId,
      },
    });
  }

  async addProductToSupplier(productId: string, supplierId: string) {
    return prisma.supplier.update({
      where: { id: supplierId },
      data: {
        products: {
          connect: { id: productId },
        },
      },
    });
  }

	async list(){
		const product = await prisma.product.findMany()
		return product
	}


}

export default new ProductService();
