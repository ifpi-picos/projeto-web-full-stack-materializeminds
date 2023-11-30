import { Request,Response } from "express";
import SupllierAutenticationServices from "./SupllierAutenticationServices";

class SupllierAutenticationController {

	async supllierAtentication(req:Request, res:Response){
		const {email,senha}=req.body

		try{
			const token = await SupllierAutenticationServices.createAtentication({
				email,
				senha
			})
	
			return res.status(201).json(token)

		}catch(error){
			console.log(error)
			if(error instanceof Error){
				res.status(400).json({error:error.message})
			}
		}
	}
}

export default new SupllierAutenticationController()