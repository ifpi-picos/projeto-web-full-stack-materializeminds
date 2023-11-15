import { Request, Response } from 'express';
import CreateSupplierService from './CreateSupllierServices';
import CreateAddressServices from '../../address/CreateAddressServices';


class CreateSupplierController {
  async createSupplier(req: Request, res: Response) {
    try {
      const {id, nomeDaEmpresa, contato, email, senha,endereco} = req.body;
      
      const {rua,cidade,estado,cep} =  endereco
      
      const address = await CreateAddressServices.createAddress({rua,cidade,estado,cep})

      if(!address.id){
        throw new Error("Endereço invalido")
      }
      
      const addressId = address.id
      
      const supplier = await CreateSupplierService.createSupplier({
        id,
        nomeDaEmpresa,
        contato,
        email,
        senha,
        addressId,
      });
      
      res.status(201).json(supplier);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao criar o fornecedor' });
    }
  }
}

export default new CreateSupplierController();
