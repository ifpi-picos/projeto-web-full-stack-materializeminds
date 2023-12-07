import { Request, Response } from "express";

import createCartServices from "./CreateCartServices";


class CartController{

	async createCart(req:Request, res:Response){

		try{
			const {userId} = req.body
			
			const cart = await createCartServices.createCartProduct({userId})

		res.status(201).json(cart)				

		}catch(error){
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o carrinho' });
		}

	}
}

export default new CartController()