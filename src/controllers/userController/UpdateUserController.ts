import { Request, Response } from 'express';
import updateUserServices  from '../../services/userServers/UpdateUserServices';

class UpdateUserController {
  
  async handle(req: Request, res: Response) {
    const { nome, email, senha, telefone,accountStatus, userId} = req.body;
    
    try{
      const user = await updateUserServices.update({
        nome,
        email,
        senha,
        telefone,
        accountStatus,
				userId
      });

      return res.json(user);
    } catch(error){
      console.log(error)
    }
  }
}

export default new UpdateUserController();
