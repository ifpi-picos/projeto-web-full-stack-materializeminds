import { Request, Response } from 'express';
import createUserServices from './CreateUserServices';
import Validator from '../../../services/Validator';
import { errorHandling } from '../../../services/errorHandling'; 
import { error } from 'console';

class CreateUserController {
  
  async create(req: Request, res: Response) {
  
    const { nome, email, senha, telefone } = req.body;
  
    try{

      const validador = Validator.validarUsuario({nome, email, senha, telefone})

      if(validador.error){
        throw new Error(validador.error.details[0].message)
      }

      const user = await createUserServices.createUser({
        nome,
        email,
        senha,
        telefone,
      });

      return res.status(200).json(user);

    } catch(error:any){

      if (error instanceof Error) {
        
        const handledError = await errorHandling(error);
        res.status(400).json({message: handledError});
      } else {
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor' });
      }
    }
  }
}

export default new CreateUserController();
