import { Request, Response } from 'express';
import ProductService from '../services//productServices/ProductService';

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const { nomeDoProduto, descricao, preco, estoque, categoria, supplierId } = req.body;
      
			const precoNumber = Number(preco);
			const estoqueNumber=  Number(estoque);
			
      console.log(typeof preco)
			const product = await ProductService.createProduct({
        nomeDoProduto,
        descricao,
        preco:precoNumber,
        estoque:estoqueNumber,
        categoria,
        supplierId});

      res.status(201).json(product);

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao criar o produto' });
    }
  }

	async listProduct(req:Request,res:Response){
		const products = await ProductService.list()
		res.json(products)
	}

}

export default new ProductController();
