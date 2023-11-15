import {hash  } from 'bcryptjs'

import { prisma } from "../../../lib/prisma";

interface ISuplierRequest{
  id:string,
  nomeDaEmpresa: string,
  addressId: string,
  contato: string,
  email: string,
  senha: string
}


class CreateSupplierService {
  async createSupplier({id, nomeDaEmpresa,addressId,contato,email,senha}:ISuplierRequest) {
    
    const suplierAlreadyExists = await prisma.supplier.findFirst({
      where:{
        email
      } 
    })
    
    if(suplierAlreadyExists){ 
      new Error("Suplier already exists")
    }
    
    const passwordHash = await hash(senha,8)
    
    const supplier = await prisma.supplier.create({
      data:{
        id,
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
