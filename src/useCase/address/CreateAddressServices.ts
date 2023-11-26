import { prisma } from "../../lib/prisma"
import ValidarCep from "../../services/ValidarCep"

interface IBodyAddress{     
	rua: string 
	cidade: string
	estado: string
	cep: string     
}

class CreateAddressServices{
	async createAddress({rua,cidade,estado,cep}:IBodyAddress){
		
		const addressValidator = await ValidarCep.getAddressInfo({rua,cidade,estado,cep})
		
		if(!addressValidator){
			throw new Error('Endereço Invalido')
		}

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