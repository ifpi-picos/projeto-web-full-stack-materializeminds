import { prisma } from "../../lib/prisma"


class ListProductServices{
	async listProduct(){
		const product = await prisma.product.findMany({
			take:100
		})
    return product
	}
}
export default new ListProductServices()