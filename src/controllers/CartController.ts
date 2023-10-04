import { Request, Response } from "express";

import CartServices from "../services/cartServices/CartServices";

class CartController{

	async createCart(req:Request, res:Response){

		try{
			const { status,total,userId } = req.body

			const total1 = Number(total)


			const cart = await CartServices.createCartProduct(status,total1,userId)

			await CartServices.addCartUser(cart.id,userId)
			res.status(201).json(cart)


		}catch(error){
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o carrinho' });
		}

	}

	async listCart(req:Request,res:Response){
		const products = await CartServices.list()
		res.json(products)
	}

}

export default new CartController()