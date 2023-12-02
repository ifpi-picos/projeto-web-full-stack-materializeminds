import { Request, Response } from "express";

import AddProductCartServices from "./AddProductCartServices";
import ListProductServices from "../../product/return/ListProductServices";


class AddProductCartController{
	async addProductCart(req:Request, res:Response){

		try{
			const {cartId,status,productId,quantidadeProduct} = req.body
			
			const product = await ListProductServices.listUniqueProduct({productId}) 
			console.log(typeof(product))
			
			if(!product){
				throw new Error('Produto não encontrado')
			}

			const cart = await AddProductCartServices.addProductCart({
				cartId,
				status,
				product
			})

		res.status(201).json(cart)				

		}catch(error){
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o carrinho' });
		}
	}
}

export default new AddProductCartController