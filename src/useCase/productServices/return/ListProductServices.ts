import { prisma } from "../../../lib/prisma"


interface IParamsProduct{
	productId:string
}

class ListProductServices{
	
	async listProducts(){
		const product = await prisma.product.findMany({
			take: 20,
		})

    return product
	}

	async listUniqueProduct({productId}:IParamsProduct){
		const product = await prisma.product.findUnique({
			where:{
				id:productId
			}
		})
	}

	async listCategoryProducts(){
		// A fazer


	}

}

export default new ListProductServices()