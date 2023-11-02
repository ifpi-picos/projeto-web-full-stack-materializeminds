import { Request, Response } from 'express';
import ReturnUserServices from "../../services/userServers/ReturnUserServices";

class ReturnUserController{
	async return(req: Request, res: Response){
		const {email} = req.params

		try{
			const dataUser = await ReturnUserServices.getUSer({email})
			res.json(dataUser)

		}catch(e){
			res.status(401)
			console.log(e)
		}
	}
}

export default new ReturnUserController()