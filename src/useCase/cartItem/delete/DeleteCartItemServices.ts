import { prisma } from "../../../lib/prisma"; 


class DeleteCartItemServices{
	async deleteCartItemServices(cartItemId:string){
		const deleteCart = await prisma.cartItem.delete({
			where:{
				id:cartItemId
			}
		})
		return deleteCart
	}
} 

export default new DeleteCartItemServices()

