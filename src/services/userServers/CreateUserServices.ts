import { hash } from "bcryptjs";

import { prisma } from "../../lib/prisma";


interface IUserRequest{
  nome:string,
  sobrenome:string,
  endereco:string,
  email:string,
  senha:string,
  telefone:string,
}

class CreateUserServices {
  async createUser({nome, sobrenome, endereco, email, senha, telefone}:IUserRequest) {
    
    const userAlreadyExists = await prisma.user.findFirst({
      where:{
        email
      } 
    })

    if(userAlreadyExists){  
      new Error("User already exists")
    }

    const passwordHash = await hash(senha,8)
    
    const user = await prisma.user.create({
      data:{
        nome,
        sobrenome,
        endereco,
        email,
        senha:passwordHash,
        telefone
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
