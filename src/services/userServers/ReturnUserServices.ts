import { prisma } from "../../lib/prisma";

interface IBodyUser{
	email: string
}

class ReturnUserServices{
	async getUSer({email}:IBodyUser){
		const user = await prisma.user.findUnique({
			where:{
				id:email
			}
		}) 
		
		return user
	}
}

export default new ReturnUserServices()