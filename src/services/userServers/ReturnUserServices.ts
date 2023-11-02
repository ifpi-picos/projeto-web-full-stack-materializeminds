import { prisma } from "../../lib/prisma";


interface IBodyUser{
	email: string
}

class ReturnUserServices{
	async getUSer({email}:IBodyUser){
		
		if(!email){
			return new Error("Email Ivalido") 
			
		}
		
		const user = await prisma.user.findUnique({
			where:{
				email:email
			}
		}) 
		return user
	}
}
export default new ReturnUserServices()