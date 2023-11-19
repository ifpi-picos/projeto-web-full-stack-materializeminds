import { Request, Response } from 'express';
import CreateSupplierService from './CreateSupllierServices';
import CreateAddressServices from '../../address/CreateAddressServices';
import Validator from '../../../provider/Validator';
import ValidarCep from '../../../services/ValidarCep';

class CreateSupplierController {
  async createSupplier(req: Request, res: Response) {
    
    const {nomeDaEmpresa, contato, email, senha,endereco} = req.body;
    const {rua,cidade,estado,cep} =  endereco    

    console.log(contato)

    try {
      const validado = await ValidarCep.getAddressInfo({rua,cidade,estado,cep}) 
      if(!validado){
        throw new Error('Endereço invalido')
      }

      const validador = Validator.validarSupllier
      ({
        nomeDaEmpresa,
        email,
        senha,
        contato,
      })

      if(validador.error){
        console.log(validador.error)
        throw new Error('Campos invalidos')
      }
      
      const address = await CreateAddressServices.createAddress({rua,cidade,estado,cep})

      if(!address.id){
        throw new Error("Endereço invalido")
      }
      
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
        res.status(400).json(error.message)
      }
      res.status(500).json({ error: 'Erro ao criar o fornecedor' });
    }
  }
}

export default new CreateSupplierController();
