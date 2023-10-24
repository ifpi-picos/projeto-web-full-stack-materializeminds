import { prisma } from "../../lib/prisma";

interface IRequest{
  nomeDoProduto: string,
  descricao: string,
  preco: number,
  estoque: number,
  categoria: string,
  supplierId: string,
	imageUrl:string
}


class CreateProductServices {
  async createProduct({nomeDoProduto, descricao, preco, estoque, categoria, supplierId,imageUrl}:IRequest) {
    
    // Verificar se existe o produto
    
    const newProduct = await prisma.product.create({
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
  
    await prisma.supplier.update({
      where: { id: supplierId },
      data: {
        products: {
          connect: { id: newProduct.id },
        },
      },
    });
    
    return newProduct
  }
}

export default new CreateProductServices();
