import { prisma } from "../../lib/prisma"

interface IOrderBody{
	orderId: string
}

class CreateOrderServices {
	async deleteOrder({orderId}:IOrderBody){
		prisma.order.delete({
			where:{
				id:orderId
			}
		})
	}
}
export default new CreateOrderServices()
