import { hash } from "bcryptjs";

import { prisma } from "../../lib/prisma";


interface IUserRequest{
  nome:string,
  email:string,
  senha:string,
  telefone:string,
}

class CreateUserServices {
  async createUser({nome,email, senha, telefone}:IUserRequest) {
    
    const userAlreadyExits = await prisma.user.findFirst({
      where:{
        email
      } 
    })

    if(userAlreadyExits){  
      new Error("User already exists")
    }

    const passwordHash = await hash(senha,8)
    
    const user = await prisma.user.create({
      data:{
        nome,
        email,
        senha:passwordHash,
        telefone,
        accountStatus:'ativo'
      }
    })
    return user;
  }

  async list(){
		const user = await prisma.user.findMany({
      include:{
        cart:true
      }
    })
		return user
	}
}

export default new CreateUserServices()
