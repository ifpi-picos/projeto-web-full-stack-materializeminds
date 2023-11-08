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
    } catch(erro ){
      console.error(erro)
      if(erro instanceof Error){
        res.status(400).json({ erro: erro.message });
      }
      
    }
  }
}

export default new CreateUserController();
