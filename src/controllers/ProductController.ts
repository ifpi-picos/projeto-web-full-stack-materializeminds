import { Request, Response } from 'express';
import ProductService from '../services//productServices/ProductService';

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const { nomeDoProduto, descricao, preco, estoque, categoria, supplierId } = req.body;
      
			const preco1 = Number(preco);
			const estoque1 = Number(estoque);
			
			const product = await ProductService.createProduct(nomeDoProduto, descricao, preco1, estoque1, categoria, supplierId);
      
			await ProductService.addProductToSupplier(product.id, supplierId);
      res.status(201).json(product);
    } catch (error) {
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o produto' });
    }
  }
	async addProductToSupplier(req: Request, res: Response) {
    try {
      const { supplierId, productId } = req.body;
      await ProductService.addProductToSupplier(productId, supplierId);
      res.status(200).json({ message: 'Produto adicionado ao fornecedor com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar o produto ao fornecedor' });
    }
  }

	async listProduct(req:Request,res:Response){
		const products = await ProductService.list()
		res.json(products)
	}

}

export default new ProductController();
