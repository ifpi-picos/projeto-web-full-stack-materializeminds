import { Request, Response } from 'express';
import createUserServices from '../../services/userServers/CreateUserServices';

class UserController {
  
  async handle(req: Request, res: Response) {
    const { nome, sobrenome, endereco, email, senha, telefone } = req.body;
    
    try{
      const user = await createUserServices.createUser({
        nome,
        sobrenome,
        endereco,
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

export default new UserController();
