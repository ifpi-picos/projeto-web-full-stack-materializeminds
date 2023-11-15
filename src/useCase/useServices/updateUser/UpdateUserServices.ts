import {hash} from 'bcryptjs'

import { prisma } from "../../../lib/prisma"

interface IUserBody{
  nome:string,
  email:string,
  senha:string,
  telefone:string,
	accountStatus:string
  userId:string,
}

class UpdateUserServices{

	async update({nome,email,senha,telefone,userId}:IUserBody){

		const passwordHash = await hash(senha,8)

		const userUpdate = await prisma.user.update({
			where:{id:userId},
			data:{
				nome,
				email,
				senha:passwordHash,
				telefone,
				accountStatus:'ativo'
			}
		})
		return userUpdate
	}
}
export default new UpdateUserServices() 