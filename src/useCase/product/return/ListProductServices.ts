import { prisma } from "../../../lib/prisma"


interface IParamsProduct{
	productId:string
}

interface IParamsProductCategory{
	categoria:string
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
		return product
	}

	async listCategoryProducts({categoria}:IParamsProductCategory){
		const product = await prisma.product.findMany({
			where:{
				categoria:categoria
			}
		})
		return product
	}

}

export default new ListProductServices()