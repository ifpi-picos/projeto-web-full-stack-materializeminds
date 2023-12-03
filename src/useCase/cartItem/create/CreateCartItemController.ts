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

			console.log(updatedCart)
			

			res.status(201).json(updatedCart)


		}catch(error){
			console.log(error)
		}
	}
}

export default new CreateCartItemController()
