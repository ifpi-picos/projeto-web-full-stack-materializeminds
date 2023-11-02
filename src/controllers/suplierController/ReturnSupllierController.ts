import { Request, Response } from 'express';
import ReturnSupllierServices from '../../services/supllierServices/ReturnSupllierServices';

class ReturnSupllierController{
	async getSupllier(req:Request,res:Response){
		try{
			const {email} = req.body

			const suplier = ReturnSupllierServices.getSupllier(email)
			
			res.status(201).json(suplier)
		}catch(e){
			console.log(e)
			res.status(401)
		}
	}	

}

export default new ReturnSupllierController()