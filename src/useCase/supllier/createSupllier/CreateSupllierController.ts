import { Request, Response } from 'express';
import CreateSupplierService from './CreateSupllierServices';
import CreateAddressServices from '../../address/CreateAddressServices';
import Validator from '../../../services/Validator';
import ValidarCep from '../../../services/ValidarCep';

class CreateSupplierController {
  async createSupplier(req: Request, res: Response) {
    
    const {nomeDaEmpresa, contato, email, senha,endereco} = req.body;
    const {rua,cidade,estado,cep} =  endereco    

    try {
      
      const cepvalidado:any = await ValidarCep.getAddressInfo({rua,cidade,estado,cep}) 

      if(cepvalidado.code ==='ERR_BAD_REQUEST'){
        throw new Error('Endereço invalido')
      }

      const dataSupllierValidad = Validator.validarSupllier
      ({
        nomeDaEmpresa,
        email,
        senha,
        contato,
      })

      
      if(dataSupllierValidad.error){
        console.log(dataSupllierValidad.error)
        throw new Error('O campo '+dataSupllierValidad.error.details[0].context?.label+' é invalido')
      }
      
      const address = await CreateAddressServices.createAddress({rua,cidade,estado,cep})

      const addressId = address.id
      
      const supplier = await CreateSupplierService.createSupplier({
        nomeDaEmpresa,
        contato,
        email,
        senha,
        addressId,
      });
      res.status(201).json(supplier);
    
    } catch (error) {
      if(error instanceof Error){        
        return res.status(400).json({message: error.message});
      }
      res.status(500).json({ error: 'Erro ao criar o fornecedor' });
    }
  }
}

export default new CreateSupplierController();
