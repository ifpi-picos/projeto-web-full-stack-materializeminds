import { Request, Response, response } from 'express';
import ProductService from './CreateProductServices';
import Validator from '../../../services/Validator'; 

class CreateProductController {

  async createProduct(req: Request, res: Response){
    try{
      
      const jsonObject = JSON.parse(req.body.data)
      const {nomeDoProduto, descricao, preco, estoque, categoria, supplierId} = jsonObject

      const productValido = Validator.validarProduct({nomeDoProduto, descricao, preco, estoque, categoria, supplierId})

      if(productValido.error){
        console.log(productValido.error)
        throw new Error("Campos invalidos")
      }

      if(!req.headers.filebaseUrl){
        throw new Error("ImageUrl not exits")
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
      console.log('4')

      if(error instanceof Error){
        res.json(error.message)
      }
      
    }
  } 
}
export default new CreateProductController();
