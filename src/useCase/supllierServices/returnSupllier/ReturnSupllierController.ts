import { Request, Response } from 'express';
import ReturnSupllierServices from './ReturnSupllierServices';

class ReturnSupllierController{
	async getSupllier(req:Request,res:Response){
		try{
			const {suplierId} = req.params

			const suplier = await  ReturnSupllierServices.getSupllier({suplierId})
			
			res.status(201).json(suplier)
		}catch(e){
			console.log(e)
			res.status(401)
		}
	}	

}

export default new ReturnSupllierController()