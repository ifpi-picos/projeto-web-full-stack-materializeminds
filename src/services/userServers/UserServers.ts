import { prisma } from "../../lib/prisma";

class UserService {
  async createUser(nome: string, sobrenome: string, endereco: string, email: string, senha: string, telefone: string) {
    return prisma.user.create({
      data: {
        nome,
        sobrenome,
        endereco,
        email,
        senha,
        telefone,
      },
    });
  }

  async list(){
		const user = await prisma.user.findMany({
      include:{
        carts:true
      }
    })
		return user
	}

}

export default new UserService();
