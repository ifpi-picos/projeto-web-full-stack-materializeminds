import { Request, Response } from 'express';
import updateUserServices  from '../../services/userServers/UpdateUserServices';

class UpdateUserController {
  
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, endereco, email, senha, telefone, userId} = req.body;
    
    try{
      const user = await updateUserServices.update({
        nome,
        sobrenome,
        endereco,
        email,
        senha,
        telefone,
				userId
      });

      return res.json(user);
    } catch(error){
      console.log(error)
    }
  }
}

export default new UpdateUserController();
