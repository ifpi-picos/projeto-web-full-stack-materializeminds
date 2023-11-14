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
    } catch(error:any){
      
      console.log(error)

      if (error instanceof Error) {
        res.status(400).json({statusText: error.message });
      } else {
        res.status(500).json({ erro: 'Erro interno do servidor' });
      }
    }
  }
}

export default new CreateUserController();
