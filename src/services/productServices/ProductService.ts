import { prisma } from "../../lib/prisma";

interface IRequest{
  nomeDoProduto: string,
  descricao: string,
  preco: number,
  estoque: number,
  categoria: string,
  supplierId: string  
}


class ProductService {
  async createProduct({nomeDoProduto, descricao, preco, estoque, categoria, supplierId}:IRequest) {
    
    // Verificar se existe o produto
    
    const newProduct = prisma.product.create({
      data: {
        nomeDoProduto,  
        descricao,
        preco,
        estoque,
        categoria,
        supplierId,
      },
    });
  
    await prisma.supplier.update({
      where: { id: supplierId },
      data: {
        products: {
          connect: { id: (await newProduct).id },
        },
      },
    });
    
    return newProduct
  }
}

export default new ProductService();
