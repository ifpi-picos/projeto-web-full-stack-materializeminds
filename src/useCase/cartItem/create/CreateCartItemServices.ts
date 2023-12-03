import { prisma } from "../../../lib/prisma"


interface ICartItem{
	quantity:number,
	cartId:string,
	productId:string
}

class CreateCartItemServices{

	async createCartItemServices({quantity,cartId,productId}:ICartItem){
	
		const cartAlereadyExits = await prisma.cart.findUnique({
			where:{
				id:cartId
			},
			include: {
				cartItems: {
					include: {
						product: true,
					},
				},
			},
		})

		if(!cartAlereadyExits){
			throw new Error('Esse carrinho não existe')
		}

		const cartItem = await prisma.cartItem.create({
			data:{
				quantity,
				cartId,
				productId
			}
		})

		return cartItem
	}
}

export default new CreateCartItemServices()
