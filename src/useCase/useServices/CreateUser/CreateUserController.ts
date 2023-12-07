import { Request, Response } from 'express';
import Validator from '../../../services/Validator';

import createUserServices from './CreateUserServices';
import CreateCartServices from '../../cart/create/CreateCartServices';

class CreateUserController {
  
  async create(req: Request, res: Response) {
  
    const { nome, email, senha, telefone } = req.body;
  
    try{

      const validador = Validator.validarUsuario({nome, email, senha, telefone})

      if(validador.error){
        throw new Error('O campo '+validador.error.details[0].context?.label+' é invalido')
      }

      const user = await createUserServices.createUser({
        nome,
        email,
        senha,
        telefone,
      });

      const userId = user.id
      const cart = CreateCartServices.createCartProduct({userId})

      return res.status(200).json({user,cart});

    } catch(error:any){

      if (error instanceof Error) {
        
        res.status(400).json({message: error.message});
      } else {
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor' });
      }
    }
  }
}

export default new CreateUserController();
