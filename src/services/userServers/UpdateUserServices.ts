import {hash} from 'bcryptjs'

import { prisma } from "../../lib/prisma"

interface IUserRequest{
  nome:string,
  sobrenome:string,
  endereco:string,
  email:string,
  senha:string,
  telefone:string,
  userId:string,
}

class UpdateUserServices{

	async update({nome,sobrenome,endereco,email,senha,telefone,userId}:IUserRequest){

		const passwordHash = await hash(senha,8)

		const userUpdate = await prisma.user.update({
			where:{id:userId},
			data:{
				nome,
				sobrenome,
				endereco,
				email,
				senha:passwordHash,
				telefone
			}
		})
		return userUpdate
	}


}
export default new UpdateUserServices() 