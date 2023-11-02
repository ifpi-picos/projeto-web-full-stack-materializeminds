import { Request, Response } from 'express';
import DeleteUserServices from '../../services/userServers/DeleteUserServices';


class DeleteUserController{
	async delete(req: Request, res: Response){
		try{
			const user = DeleteUserServices.deleteUser()
			res.send(user)
		}catch(e){
			console.log(e)
		}
	}
}
export default new DeleteUserController()


