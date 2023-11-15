import { Request, Response } from 'express';
import DeleteUserServices from './DeleteUserServices';


class DeleteUserController{
	async delete(req: Request, res: Response){
		const {userId} = req.params

		try{
			const user = DeleteUserServices.deleteAll()
			res.status(200)
		}catch(e){
			console.log(e)
		}
	}
}
export default new DeleteUserController()


