import { prisma } from "../../../lib/prisma";


interface ISuplierRequest{
	suplierId: string
}


class ReturnSupllierServices{
	async getSupllier({suplierId}:ISuplierRequest){

		const supplier = await prisma.supplier.findMany({
			where:{
				id:suplierId
			},
			select:{
				id:true,
				nomeDaEmpresa:true,
				contato:true,
				email:true,
				products: true,
				address: true,
			}
		})
		
		return supplier
	}
}

export default new ReturnSupllierServices()