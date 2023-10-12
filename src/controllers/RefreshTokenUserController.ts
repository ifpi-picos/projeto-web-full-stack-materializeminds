import { Request,Response } from "express"
import { RefreshTokenUserServices } from "../services/refreshTokenUser/RefreshTokenUserServices" 


class RefreshTokenUserController{
	async handle(request:Request, response:Response){
		const {userId} = request.body

		const refreshTokenUserServices = new RefreshTokenUserServices()
		const token  = await refreshTokenUserServices.execute(userId)

		return response.json(token)

	}
}

export { RefreshTokenUserController }