import { prisma } from "../../lib/prisma";


interface IBodyUser{
	userId: string
}

class ReturnUserServices{
	async getUSer({userId}:IBodyUser){
		
		if(!userId){
			return new Error("Email Ivalido") 
		}
		
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select:{
				id: true,
				nome: true,
				email:true,
				cart:true,
				telefone:true,
				orders:true,
				refresh_token:true,
			}

		})
		return user
		
	}
}
export default new ReturnUserServices()