import { hash  } from 'bcryptjs'

import { prisma } from "../../lib/prisma";

interface ISuplierRequest{
  nomeDaEmpresa: string,
  endereco: string,
  contato: string,
  email: string,
  senha: string
}


class UpdateSupplierService {
  async createSupplier({nomeDaEmpresa,endereco,contato,email,senha}:ISuplierRequest) {
    
    const suplierAlreadyExists = await prisma.supplier.findFirst({
      where:{
        email
      } 
    })

    if(suplierAlreadyExists){ 
      new Error("Suplier already exists")
    }
    
    const passwordHash = await hash(senha,8)
    
    const supplier = await prisma.supplier.update({
			where:{
				email:email
			},
      data:{
        nomeDaEmpresa,
        endereco,
        contato,
        email,
        senha:passwordHash
      }
    })
    return supplier;
  }
  
}

export default new UpdateSupplierService();
