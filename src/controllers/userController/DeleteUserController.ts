import { Request, Response } from 'express';
import DeleteUserServices from '../../services/userServers/DeleteUserServices';


class DeleteUserController{
	async delete(req: Request, res: Response){
		const {userId} = req.params

		try{
			const user = DeleteUserServices.deleteUser({userId})
			res.send(user)
		}catch(e){
			console.log(e)
		}
	}
}
export default new DeleteUserController()


