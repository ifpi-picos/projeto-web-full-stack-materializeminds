import { Request, Response } from "express";

import UpdateCartItemServices from "./UpdateCartItemServices"
import UpdateCartServices from "../../cart/update/UpdateCartServices";

class UpdateCartItemController{
	async updateCartItem(req:Request,res:Response){

		const{cartItemId,newQuatity}= req.body
		const {cartId} = req.params

		try{
			
			UpdateCartItemServices.updateCartItemServices({cartItemId,newQuatity})

			const cart = await UpdateCartServices.UpdateCartServices({cartId})

			console.log(cart)
			res.status(201).json(cart)
		}catch(error){
			console.log(error)
		}
	}
}

export default new UpdateCartItemController()