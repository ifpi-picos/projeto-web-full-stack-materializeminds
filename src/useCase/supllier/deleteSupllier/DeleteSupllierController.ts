import { Request, Response } from 'express';
import DeleteSupllierServices from './DeleteSupllierServices';

class DeleteSupllierController{
	async deleteSupllier(req:Request,res:Response){
		try{
			const {suplierId} = req.params

			const suplier = await  DeleteSupllierServices.deleteSupllier({suplierId})
			
			res.status(201).json(suplier)
		}catch(e){
			console.log(e)
			res.status(401)
		}
	}	

}

export default new DeleteSupllierController()