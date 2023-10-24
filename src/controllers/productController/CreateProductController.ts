import { Request, Response, response } from 'express';
import ProductService from '../../services/productServices/CreateProductServices';

class CreateProductController {

  async createProduct(req: Request, res: Response){
    try{

      const jsonObject = JSON.parse(req.body.data)

      const {nomeDoProduto, descricao, preco, estoque, categoria, supplierId} = jsonObject

      if(!req.headers.filebaseUrl){
        res.json({"Erro":"ImageUrl not exits"})
      }

      const imageUrl = req.headers.filebaseUrl as string;
      

      const product = await ProductService.createProduct({
        nomeDoProduto,
        descricao,
        preco,
        estoque,
        categoria,
        supplierId,
        imageUrl
      });
      
      res.status(201).json(product)

    }catch(error){
      console.log(error)
    }
  } 
}
export default new CreateProductController();
