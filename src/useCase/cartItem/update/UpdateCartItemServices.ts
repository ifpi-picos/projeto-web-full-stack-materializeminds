import { prisma } from "../../../lib/prisma"


interface ICartItem{
	cartItemId :string,
	newQuatity:number
}


class UpdateCartItemServices{
	async updateCartItemServices({cartItemId,newQuatity}:ICartItem){
		

		const cartIdAlreadyExits = await prisma.cartItem.findUnique({
			where:{
				id:cartItemId
			}
		})

		if(!cartIdAlreadyExits){
			throw new Error('Item no exist no seu carrinho')
		}

		console.log(cartIdAlreadyExits)
		console.log('sds')

		const updateCartItem = await prisma.cartItem.update({
			where:{
				id:cartItemId
			},
			data:{
				quantity:newQuatity
			}
		})
		return updateCartItem
	}
}

export default new UpdateCartItemServices()