import { prisma } from "../../lib/prisma"


interface IBodyAddress{     
	rua: string 
	cidade: string
	estado: string
	cep: string     
}

class CreateAddressServices{
	async createAddress({rua,cidade,estado,cep}:IBodyAddress){
		
		// fazer a verificação para garantir unicidade em cada registro

		const addressAlreadyExists = await prisma.address.findFirst({
			where:{
				cep:cep
			}
		})

		if(addressAlreadyExists){
			return addressAlreadyExists
		}

		const address = await prisma.address.create({
			data:{
				rua,
				cidade,
				estado,
				cep
			}
		})

		return address
	}
}

export default new CreateAddressServices()