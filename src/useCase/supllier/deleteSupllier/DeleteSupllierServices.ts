import { prisma } from "../../../lib/prisma";


interface ISuplierRequest{
	suplierId: string
}


class DeleteSupllierServices {
	async deleteSupllier({suplierId}:ISuplierRequest){

		const supplier = await prisma.supplier.delete({
			where:{
				id:suplierId
			}
		})
		
		return supplier
	}
}

export default new DeleteSupllierServices()