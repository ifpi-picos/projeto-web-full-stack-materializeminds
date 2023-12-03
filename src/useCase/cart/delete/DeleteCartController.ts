import { Request, Response } from "express";

import DeleteCartServices from "./DeleteCartServices";


class DeleteCartController{
	deleteCart(req:Request, res:Response){

		const {cartId} = req.params

		try{

			const deleteCart = DeleteCartServices.deleteCartServices(cartId)
	
			console.log(deleteCart)
			res.status(201).json(deleteCart)

		}catch(error){
			console.log(error)
		}
	}
}

export default new DeleteCartController()