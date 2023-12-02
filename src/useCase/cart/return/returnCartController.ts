import { Request, Response } from "express";

import returnCartServices from "./returnCartServices";

class ReturnCartController{

	async getCart(req:Request, res:Response){

		try{
			const {userId} = req.params 

			const cart = await returnCartServices.getCard({userId})

			res.status(201).json(cart)				
		
		}catch(error){
			console.log(error)
      res.status(500).json({ error: 'Erro ao criar o carrinho' });
		}
	}
}

export default new ReturnCartController()