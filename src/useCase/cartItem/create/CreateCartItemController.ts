import { Request, Response } from "express";

import CreateCartItemServices from "./CreateCartItemServices";
import UpdateCartServices from "../../cart/update/UpdateCartServices";


class CreateCartItemController{
	async createCartItem(req:Request,res:Response){
		
		const {quantity,cartId,productId} = req.body
		
		try{
			
			const cartItem = await CreateCartItemServices.createCartItemServices({
				quantity,
				cartId,
				productId
			})

			const updatedCart = await UpdateCartServices.UpdateCartServices({cartId})

			res.status(201).json(updatedCart)

		}catch(error){
			if(error instanceof Error){
				res.status(400).json(error)
			}
			
			console.log(error)
			res.status(500).json('Erro Interno do Servidor, tente mais tarde !')
		}
	}
}

export default new CreateCartItemController()
