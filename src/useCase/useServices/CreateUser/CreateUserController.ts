import { Request, Response } from 'express';
import createUserServices from './CreateUserServices';
import Validator from '../../../provider/Validator';

class CreateUserController {
  
  async create(req: Request, res: Response) {
  
    const { nome, email, senha, telefone } = req.body;
  
    try{

      const validador = Validator.validarUsuario({nome, email, senha, telefone})
      console.log(validador)
      if(validador.error){
        console.log(validador.error)
        throw new Error('Campos invalidos')
        
      }

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
