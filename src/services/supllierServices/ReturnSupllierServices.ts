import { prisma } from "../../lib/prisma";


interface ISuplierRequest{
	email: string
}


class ReturnSupllierServices{
	async getSupllier({email}:ISuplierRequest){

		const supplier = await prisma.supplier.findMany({
			where:{
				email:email
			}
		})
		
		return supplier
	}

	async getSupllierAndProducts({email}:ISuplierRequest){
		
		const supplier = await prisma.supplier.findMany({
			where:{
				email:email
			},
			
			include:{
				products:true
			}
		})
		return supplier
	}

}

export default new ReturnSupllierServices()