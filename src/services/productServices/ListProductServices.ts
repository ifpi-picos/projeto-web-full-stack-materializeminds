import { prisma } from "../../lib/prisma"


class ListProductServices{
	async listProduct(){
		const product = await prisma.product.findMany()
    return product
	}
}
export default new ListProductServices()