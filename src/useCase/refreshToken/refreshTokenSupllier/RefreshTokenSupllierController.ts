import { Request,Response } from "express"
import RefreshTokenUserServices  from "./RefreshTokenSupllierServices" 


class RefreshTokenSupllierController{
	async handle(req:Request, res:Response){
		const {supllierId} = req.body

		try{
			const token  = await RefreshTokenUserServices.execute(supllierId)

			return res.json(token)

		}catch(error){
			console.log(error)
			if(error instanceof Error){
				res.status(400).json({error:error.message})
			}
		}
	}
}

export default new RefreshTokenSupllierController() 