import { Request,Response } from "express"
import RefreshTokenUserServices  from "./RefreshTokenUserServices" 


class RefreshTokenUserController{
	async handle(req:Request, res:Response){
		const {userId} = req.body

		try{
			const token  = await RefreshTokenUserServices.execute(userId)

			return res.json(token)

		}catch(error){
			console.log(error)
			if(error instanceof Error){
				res.status(400).json({error:error.message})
			}
		}
	}
}

export { RefreshTokenUserController }