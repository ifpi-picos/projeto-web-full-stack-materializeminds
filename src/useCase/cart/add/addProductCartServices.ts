import { prisma } from "../../../lib/prisma";

import ListProductServices from "../../product/return/ListProductServices";

interface IRequest {
	cartId:string
	status: string,
	product:any
}

class AddProductCartServices {
  async addProductCart({cartId,status,product}:IRequest) {

		const cartAlereadyExits = await prisma.cart.findUnique({
			where:{
				id:cartId
			}
		})

		if(!cartAlereadyExits){
			throw new Error('Id Do Carrinho Invalido')
		}

		
		console.log(cartAlereadyExits.total)
		console.log(product)

		const valorTotal = await product.preco + cartAlereadyExits.total

		const updateCart = await prisma.cart.update({
			where:{
				id:cartId
			},
			data: {
				status,
				total:valorTotal,
				products: {
					connect: [product],
				},
			},
		});
		return updateCart;
	}

}

export default new AddProductCartServices()