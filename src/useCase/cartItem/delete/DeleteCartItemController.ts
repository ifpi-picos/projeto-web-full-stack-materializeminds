import { Request, Response } from "express";

import DeleteCartItemServices from "./DeleteCartItemServices";


class DeleteCartItemController{
	deleteCart(req:Request, res:Response){

		const {cartItemId} = req.params

		try{

			const deleteCart = DeleteCartItemServices.deleteCartItemServices(cartItemId)
	
			console.log(deleteCart)
			res.status(201).json(deleteCart)

		}catch(error){
			console.log(error)
		}
	}
}	

export default new DeleteCartItemController()