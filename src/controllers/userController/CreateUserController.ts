import { Request, Response } from 'express';
import createUserServices from '../../services/userServers/CreateUserServices';

class CreateUserController {
  
  async create(req: Request, res: Response) {
    const { nome, email, senha, telefone } = req.body;
    
    try{
      const user = await createUserServices.createUser({
        nome,
        email,
        senha,
        telefone,
      });

      return res.json(user);
    } catch(error){
      console.log(error)
    }
  }

  async list(req: Request, res: Response){
    const user = await createUserServices.list()
    res.json(user)
  }

}

export default new CreateUserController();
