import { prisma } from "../../lib/prisma"


interface IBodyAddress{     
	rua: string 
	cidade: string
	estado: string
	cep: string     
}

class CreateAddressServices{
	createAddress({rua,cidade,estado,cep}:IBodyAddress){
		
		// fazer a verificação para garantir unicidade em cada registro

		const address = prisma.address.create({
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