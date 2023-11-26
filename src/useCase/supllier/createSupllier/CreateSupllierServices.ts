import {hash  } from 'bcryptjs'

import { prisma } from "../../../lib/prisma";

interface ISuplierRequest{
  nomeDaEmpresa: string,
  addressId: string,
  contato: string,
  email: string,
  senha: string
}


class CreateSupplierService {
  async createSupplier({nomeDaEmpresa,addressId,contato,email,senha}:ISuplierRequest) {
    
  
    const suplierAlreadyExists = await prisma.supplier.findFirst({
      where:{
        email
      } 
    })
    
    if(suplierAlreadyExists){ 
      throw new Error("Fornecedor já cadastrado")
    }
    
    const passwordHash = await hash(senha,8)
    
    const supplier = await prisma.supplier.create({
      data:{
        nomeDaEmpresa,
        contato,
        email,
        senha:passwordHash,
        addressId,
      }
    })
    return supplier;
  }

}

export default new CreateSupplierService();
