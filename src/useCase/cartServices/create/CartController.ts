import { Request, Response } from "express";

import createCartServices from "./CreateCartServices";

class CartController{

	async createCart(req:Request, res:Response){

		try{
			const { status,total,userId,productId } = req.body

			const totalNumber = Number(total)


			const cart = await createCartServices.createCartProduct({
				status,
				total:totalNumber,
				userId,
				productId
			})

		res.status(201).json(cart)				

		}catch(error){
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o carrinho' });
		}

	}

	async listCart(req:Request,res:Response){
		const products = await createCartServices.list()
		res.json(products)
	}

}

export default new CartController()