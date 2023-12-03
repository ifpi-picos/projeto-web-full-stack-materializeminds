import { prisma } from "../../../lib/prisma"; 


class DeleteCartServices{
	async deleteCartServices(cartId:string){
		const deleteCart = await prisma.cart.delete({
			where:{
				id:cartId
			}
		})
		return deleteCart
	}
} 

export default new DeleteCartServices()

