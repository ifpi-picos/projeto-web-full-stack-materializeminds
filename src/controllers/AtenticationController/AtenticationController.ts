import { Request,Response } from "express";
import autenticationServices from "../../services/autenticationServices/AutenticationServices";


class AutenticationController {

	async handle(req:Request, res:Response){
		const {email,senha}=req.body

		const token = await autenticationServices.createAtentication({
			email,
			senha
		})

		return res.json(token)
	}
}

export default new AutenticationController()